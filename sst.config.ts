import { SSTConfig } from "sst"
import { NextjsSite } from "sst/constructs"

export default {
  config(_input) {
    return {
      name: "challenge-with-me-fe",
      region: "us-east-1",
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: "challenge-with-me.xyz",
          hostedZone: "challenge-with-me.xyz",
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
