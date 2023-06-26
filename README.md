<h2 align="center">Nitric multi-cloud demo for PulumiUP 2023</h2>

<p align="center">
  <a href="https://nitric.io">
    <img src="./docs/screen-capture.png" width="340" alt="Nitric Logo"/>
  </a>
</p>

This is an example of an application built with the [Nitric framework](https://nitric.io), showing how you can easily develop locally and deploy to the cloud(s) of your choice without writing loads of infrastructure. This example can be easily deployed to AWS, GCP or Azure. At the moment the infrastructure scripts support AWS and GCP deployment load balancing but could be adapted to include Azure as an additional deployment target as well.

## Running locally

To run this example locally simply run

```bash
yarn install
```

followed by
```bash
yarn dev
```

> Or use npm if you prefer

and navigate to the API displayed on the console `http://localhost:4001`

## Deploying to the cloud

Stack files are provided already to get you started, if you already have you local credential configured and have pulumi setup you can start deploying right away.

### Deploying to AWS

[Check your setup](https://nitric.io/docs/reference/providers/aws)

Update the `nitric-prod-aws.yaml` stack file to set the region you would like to deploy to. From there you can simply run.

```bash
nitric up
```

Select `prod-aws` as your stack and watch the deployment happen.

### Deploy to GCP

[Check your setup](https://nitric.io/docs/reference/providers/gcp)

Update the `nitric-prod-gcp.yaml` stack file to set the region and project you would like to deploy to. From there you can simply run.

```bash
nitric up
```

Select `prod-gcp` as your stack and watch the deployment happen.

### Deploying to Azure

[Check your setup](https://nitric.io/docs/reference/providers/azure)

To create a new stack to deploy to azure run

```bash
nitric stack new
```

select Azure as the cloud you would like to deploy to and follow the prompts.

Once your stack is ready run

```
nitric up
```

and select your azure stack to deploy.

### Making it multi-cloud

If you've deployed to both AWS and GCP, there is a script available to wire up their respective APIs to a cloudflare load balancer.

Before you start checkout the `.env.example` template file to create your own `.env` file. 

This contains information for connecting to your cloudflare account to provision a load balancer.

## Explore how it works

Check out how these deployments happen under the hood at the [nitric main repository](https://github.com/nitrictech/nitric). Like what you see leave us a ⭐.

Also [checkout our docs](https://nitric.io/docs) & [join us on discord](https://discord.gg/Webemece5C). 

The demonstration of this application in action at PulumiUP 2023 is available on [YouTube](https://www.youtube.com/watch?v=x3V-IBfrBDI). 


## About Nitric

[Nitric](https://nitric.io) is a cloud-aware framework that enhances productivity, uniting backend and infrastructure code to build and ship cloud applications fast.

We’ve taken a unique approach to self-service infrastructure with self-provisioning, which significantly boosts developer productivity and elevates their overall experience.

Nitric also takes a cloud-agnostic approach, maintaining consistency across various cloud platforms, which is crucial to prevent vendor lock-in and ensure redundancy. This platform abstraction can empower organizations to adapt their application architectures without disrupting developer focus on innovation and your competitive edge. Apps built with Nitric can be deployed to AWS, Azure or Google Cloud all from the same code base.







