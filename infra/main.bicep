targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Name of the resource group')
param resourceGroupName string = 'rg-${environmentName}'

var resourceToken = uniqueString(subscription().id, location, environmentName)
var resourcePrefix = 'vp'

// Create resource group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location
  tags: {
    'azd-env-name': environmentName
  }
}

// Deploy resources to the resource group
module resources 'resources.bicep' = {
  name: 'resources'
  scope: rg
  params: {
    location: location
    environmentName: environmentName
    resourceToken: resourceToken
    resourcePrefix: resourcePrefix
  }
}

// Outputs
output RESOURCE_GROUP_ID string = rg.id
output AZURE_STORAGE_ACCOUNT_NAME string = resources.outputs.storageAccountName
output AZURE_STORAGE_BLOB_URL string = resources.outputs.storageAccountBlobUrl
output AZURE_STATIC_WEB_APP_URL string = resources.outputs.staticWebAppUrl
output VIDEO_CDN_URL string = resources.outputs.storageAccountBlobUrl
