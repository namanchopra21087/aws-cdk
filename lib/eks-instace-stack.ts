import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkEksExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC for the EKS cluster
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // Number of availability zones
    });

    // Create an EKS Cluster
    const cluster = new eks.Cluster(this, 'MyEksCluster', {
      vpc,
      defaultCapacity: 2, // Number of worker nodes
      version: eks.KubernetesVersion.V1_23, // Specify Kubernetes version
      clusterName:'EksClusterStack'
    });

    // Optionally, you can add IAM policies to the cluster
    const nodeGroup = cluster.addAutoScalingGroupCapacity('MyNodeGroup', {
      instanceType: new ec2.InstanceType('t3.medium'), // Instance type for worker nodes
      minCapacity: 2, // Minimum number of nodes
    });

    // Attach IAM policies to the node group
    nodeGroup.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSWorkerNodePolicy'));
    nodeGroup.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryReadOnly'));
    nodeGroup.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEKS_CNI_Policy'));
  }
}
