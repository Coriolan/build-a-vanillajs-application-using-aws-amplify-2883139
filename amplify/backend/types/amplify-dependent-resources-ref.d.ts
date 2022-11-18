export type AmplifyDependentResourcesAttributes = {
    "api": {
        "linkedinlearningamplify": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "linkedinlearningamplify": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "binaryvillepics": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "linkedinlearningamplifyPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    }
}