import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class Ec2InstanceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new VPC (Virtual Private Cloud)
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // Default is all availability zones in the region
      vpcName: 'ec2InstanceVpc'
    });

    const securityGroup=new ec2.SecurityGroup(this,'SecurityGroupStack',{
        vpc,
        description:'Allow inbound access to ec2',
        allowAllOutbound:true
    });
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(),ec2.Port.tcp(22),'Allow inbound access to ec2');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(),ec2.Port.tcp(8080),'Allow inbound access to ec2 from 8080');

    // Define a new EC2 instance within the VPC
    const instance = new ec2.Instance(this, 'Ec2InstanceStack', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'), // Instance type
      machineImage: ec2.MachineImage.latestAmazonLinux(), // Amazon Linux 2
      keyName: 'test-ec2-instance-cdk', // SSH key to connect to the instance
      instanceName: 'Ec2InstanceStack',
      securityGroup: securityGroup
    });
  }
}
