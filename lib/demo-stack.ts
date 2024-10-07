import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket, EventType } from 'aws-cdk-lib/aws-s3';
import { SqsDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //L1 construct for S3Bucket
    const level1S3Bucket=new CfnBucket(this,'MyFirstL1ConstructS3Bucket',{
      versioningConfiguration:{
        status: "Enabled"
      }
    });
    
     //L2 construct for S3Bucket

     const level2ConstructS3Bucket=new Bucket(this,'MyFirstL2ConstructS3Bucket',{
      bucketName: 'myfirstl2constructs3bucketforuntill',
      versioned:true
     });

     const queue= new Queue(this,'MySqsQueue',{
      visibilityTimeout: cdk.Duration.seconds(300),
     });

     level2ConstructS3Bucket.addEventNotification(
      EventType.OBJECT_CREATED, new SqsDestination(queue));
  }
}
