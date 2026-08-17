[CmdletBinding()]
param(
  [Parameter(Mandatory)]
  [ValidatePattern('^[a-z][a-z0-9-]{4,28}[a-z0-9]$')]
  [string]$ProjectId,
  [string]$Region = 'us-central1',
  [string]$Repository = 'agsit',
  [string]$RuntimeServiceAccountName = 'agsit-web-runtime'
)

$ErrorActionPreference = 'Stop'

function Invoke-Gcloud {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)

  & gcloud @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "gcloud $($Arguments -join ' ') failed."
  }
}

function Get-GcloudValue {
  param([Parameter(Mandatory)][string[]]$Arguments)

  return (& gcloud @Arguments | Out-String).Trim()
}

Invoke-Gcloud -Arguments @('config', 'set', 'project', $ProjectId)
Invoke-Gcloud -Arguments @(
  'services', 'enable',
  'artifactregistry.googleapis.com',
  'cloudbuild.googleapis.com',
  'firebase.googleapis.com',
  'run.googleapis.com',
  'secretmanager.googleapis.com'
)

$runtimeServiceAccount = "$RuntimeServiceAccountName@$ProjectId.iam.gserviceaccount.com"

$existingRuntimeServiceAccounts = Get-GcloudValue -Arguments @('iam', 'service-accounts', 'list', "--project=$ProjectId", '--format=value(email)')
if ($existingRuntimeServiceAccounts -notmatch [regex]::Escape($runtimeServiceAccount)) {
  Invoke-Gcloud -Arguments @(
    'iam', 'service-accounts', 'create', $RuntimeServiceAccountName,
    '--display-name=AGSIT web Cloud Run runtime',
    "--project=$ProjectId"
  )
}

$repositoryResourceName = "projects/$ProjectId/locations/$Region/repositories/$Repository"
$existingRepositories = Get-GcloudValue -Arguments @('artifacts', 'repositories', 'list', "--location=$Region", "--project=$ProjectId", '--format=value(name)')
if ($existingRepositories -notmatch [regex]::Escape($repositoryResourceName)) {
  Invoke-Gcloud -Arguments @(
    'artifacts', 'repositories', 'create', $Repository,
    '--repository-format=docker',
    "--location=$Region",
    '--description=Container images for the AGSIT web contact endpoint',
    "--project=$ProjectId"
  )
}

$existingSecrets = Get-GcloudValue -Arguments @('secrets', 'list', "--project=$ProjectId", '--format=value(name)')
if ($existingSecrets -notmatch '/secrets/BITRIX_WEBHOOK_URL') {
  Invoke-Gcloud -Arguments @(
    'secrets', 'create', 'BITRIX_WEBHOOK_URL',
    '--replication-policy=automatic',
    '--labels=application=agsit-web',
    "--project=$ProjectId"
  )
}

$cloudBuildServiceAccount = Get-GcloudValue -Arguments @('builds', 'get-default-service-account', "--project=$ProjectId")
if (-not $cloudBuildServiceAccount) {
  throw 'No se pudo determinar la cuenta de servicio predeterminada de Cloud Build.'
}

foreach ($role in @('roles/artifactregistry.writer', 'roles/run.admin', 'roles/firebasehosting.admin')) {
  Invoke-Gcloud -Arguments @(
    'projects', 'add-iam-policy-binding', $ProjectId,
    "--member=serviceAccount:$cloudBuildServiceAccount",
    "--role=$role",
    '--quiet'
  )
}

Invoke-Gcloud -Arguments @(
  'iam', 'service-accounts', 'add-iam-policy-binding', $runtimeServiceAccount,
  "--member=serviceAccount:$cloudBuildServiceAccount",
  '--role=roles/iam.serviceAccountUser',
  "--project=$ProjectId",
  '--quiet'
)

Invoke-Gcloud -Arguments @(
  'secrets', 'add-iam-policy-binding', 'BITRIX_WEBHOOK_URL',
  "--member=serviceAccount:$runtimeServiceAccount",
  '--role=roles/secretmanager.secretAccessor',
  "--project=$ProjectId",
  '--quiet'
)

Invoke-Gcloud -Arguments @(
  'artifacts', 'repositories', 'set-cleanup-policies', $Repository,
  "--location=$Region",
  "--policy=$PSScriptRoot/artifact-cleanup-policy.json",
  "--project=$ProjectId",
  '--quiet'
)

Write-Host ''
Write-Host 'Bootstrap terminado.'
Write-Host 'Falta guardar el webhook sin exponerlo en historial de comandos:'
Write-Host "  gcloud secrets versions add BITRIX_WEBHOOK_URL --project $ProjectId --data-file=-"
Write-Host 'Pega el valor, presiona Enter y después Ctrl+Z seguido de Enter en Windows.'
Write-Host "Conecta el proyecto con Firebase y crea el trigger de Cloud Build para main usando cloudbuild.yaml."
