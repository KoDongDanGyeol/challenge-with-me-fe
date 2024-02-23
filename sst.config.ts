import { SSTConfig } from "sst"
import { NextjsSite } from "sst/constructs"
import { Certificate } from "aws-cdk-lib/aws-certificatemanager"

export default {
  config(_input) {
    return {
      name: "challenge-with-me",
      region: "ap-northeast-2",
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        edge: true,
        customDomain: {
          isExternalDomain: true,
          domainName: "challenge-with-me.xyz",
          cdk: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            certificate: Certificate.fromCertificateArn(stack, "cert", process.env.AWS_CERT_ARN!),
          },
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
