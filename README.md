<h2 align="center">Nitric multi-cloud PulumiUP demo</h2>

<p align="center">
  <a href="https://nitric.io">
    <img src="./docs/screen-capture.png" width="340" alt="Nitric Logo"/>
  </a>
</p>

This example can be easily deploy to AWS, GCP or Azure. At the moment the infrastructure scripts support AWS and GCP deployment load balancing but could be adapted to include Azure as an additional deployment target as well.

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

### Making it multicloud

If you've deployed to both AWS and GCP, there is a script available to wire up their respective APIs to a cloudflare load balancer.

Before you start checkout the `.env.example` template file to create your own `.env` file. 

This contains information for connecting to your cloudflare account to provision a load balancer.

## Explore how it works

Check out how these deployments happen under the hood at the [nitric main repository](https://github.com/nitrictech/nitric). Like what you see leave us a ⭐.

Also [checkout our docs](https://nitric.io/docs) & [join us on discord](https://discord.gg/Webemece5C)










