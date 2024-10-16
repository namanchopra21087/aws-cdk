#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoStack } from '../lib/demo-stack';
import { MyLambdaCdkStack } from '../lib/my-lambda-cdk-stack';
import { SqsLambdaStack } from '../lib/sqs-lambda';
import { ApiGatewayStack } from '../lib/api-gateway';
import { Ec2InstanceStack } from '../lib/ec2-instance-stack';
import { CdkEksExampleStack } from '../lib/eks-instace-stack';

const app = new cdk.App();
new DemoStack(app, 'DemoStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

const lambdaSqs=new MyLambdaCdkStack(app,'LambdaStack',{});

new SqsLambdaStack(app,'LambdaSqsQueueStack',{});

new ApiGatewayStack(app,'ApiGatewayStack',{});
new Ec2InstanceStack(app,'Ec2InstanceStack',{});
new CdkEksExampleStack(app,'EksClusterStack',{})