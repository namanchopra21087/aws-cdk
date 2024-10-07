import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { LambdaStack } from './reuseable-lambda'; // Import the Lambda stack

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Reuse the existing Lambda function from another stack
    const lambdaStack = new LambdaStack(scope, 'ReusableLambdaStack');
    const existingLambda = lambdaStack.myTestLambdaFunction;

    // Create an API Gateway REST API
    const api = new RestApi(this, 'MyApi', {
      restApiName: 'ReusableLambdaAPI',
    });

    // Create a resource and integrate it with the existing Lambda function
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET', new LambdaIntegration(existingLambda));
  }
}
