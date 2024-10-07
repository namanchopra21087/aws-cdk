import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class MyLambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const myLambda = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,  // Lambda runtime environment
      code: lambda.Code.fromAsset('lambda'), // Code from the 'lambda' directory
      handler: 'index.handler',              // Function entry point
      functionName: 'FirstOctoberLambda'
    });

    // Add a Function URL to the Lambda function
    const fnUrl=myLambda.addFunctionUrl({
        authType: lambda.FunctionUrlAuthType.NONE,
    });

    // Output the Function URL
    new cdk.CfnOutput(this,'functionUrl',{
        value:fnUrl.url,
    })
  }
}
