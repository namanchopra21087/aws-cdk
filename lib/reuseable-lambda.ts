import * as cdk from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

export class LambdaStack extends cdk.Stack {
  public readonly myTestLambdaFunction: Function;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    this.myTestLambdaFunction = new Function(this, 'MyLambdaFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      functionName: 'reusableLambda',
      code: Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello from the existing naman Lambda!" })
          };
        };
      `),
    });
  }
}
