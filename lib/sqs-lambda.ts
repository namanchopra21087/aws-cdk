import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AuthType } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Queue, QueueEncryption } from 'aws-cdk-lib/aws-sqs';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class SqsLambdaStack extends cdk.Stack{
    constructor(scope:Construct,id:string,props:cdk.StackProps){
        super(scope, id, props);

        const sqsLambda=new lambda.Function(this,'SqsLambda',{
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset('lambda'),
            handler:'index.handler',
            functionName:'SqsLambdaIntegration'
            
        });

        const funcUrl=sqsLambda.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
        });

        new cdk.CfnOutput(this,'sqsLambdaFunctionUrl',{
            value:funcUrl.url
        });

        //Create SqsQueue
        const sqsQueue=new Queue(this,'SqsLambdaQueue',{
            visibilityTimeout: cdk.Duration.seconds(30),
            retentionPeriod: cdk.Duration.days(4),
            encryption: QueueEncryption.KMS_MANAGED  // Default encryption
        });

        //Add sqsQueue as event source for lambda
        sqsLambda.addEventSource(new SqsEventSource(sqsQueue,{
            batchSize: 10, 
        }))
    }

}