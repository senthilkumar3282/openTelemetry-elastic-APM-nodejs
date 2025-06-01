Here’s a **step-by-step guide** on how to use **Elastic Cloud on AWS** and create your deployment — specifically to use **Elastic APM with OpenTelemetry**, **ELK**, or **logs/metrics/traces**:

---

## Step-by-Step: Use Elastic Cloud on AWS

### 1. **Sign Up / Login to Elastic Cloud**

* Go to: [https://cloud.elastic.co](https://cloud.elastic.co)
* Sign in or create a free account (Elastic offers a free trial).

---

### 2. **Create a Deployment**

1. Click **"Create deployment"**.
2. Choose **Cloud provider**: Select **AWS**.
3. Choose **Region**: Pick a region close to your services (e.g., `ap-south-1` for Mumbai).
4. Choose a **Deployment Template**:

   * If you're doing observability (metrics/traces/logs), select:

     * **"Observability"** template — this includes APM, Kibana, and Elasticsearch.
5. Name your deployment (e.g., `otel-node-demo`).

> Elastic will automatically provision:
>
> * **Elasticsearch**
> * **Kibana**
> * **APM Server**

Wait for 5–10 minutes for the deployment to be ready.

---

### 3. **Access Kibana**

* Once the deployment is ready, click **"Launch Kibana"**.
* In Kibana, go to:

  * **Observability → APM** — for traces/metrics
  * **Discover / Logs** — for logs
  * **Dashboard** — for custom dashboards

---

### 4. **Get APM Server Settings**

To connect your app (Node.js, Python, etc.):

1. Go to **Kibana → Observability → APM → Add data**.
2. Choose your language (e.g., Node.js, Python).
3. It will give you:

   * APM Server URL (`https://<id>.apm.<region>.aws.elastic-cloud.com`)
   * `secretToken` for authentication
   * Installation and setup steps

---

### 5. **Connect Your App (Example: Node.js)**

Install the APM agent:

```bash
npm install elastic-apm-node --save
```

Use it in your `app.js`:

```js
require('elastic-apm-node').start({
  serviceName: 'my-node-service',
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  environment: 'production',
});
```

In your `.env`:

```env
ELASTIC_APM_SECRET_TOKEN=your-secret-token
ELASTIC_APM_SERVER_URL=https://your-apm-id.apm.ap-south-1.aws.elastic-cloud.com
```

---

### 6. **Send Data and View in Kibana**

* Run your app.
* Generate some traffic (e.g., call API endpoints).
* Go to Kibana:

  * **APM → Services**: View traces and transactions.
  * **Metrics** tab for metrics.
  * **Discover**: Search in `traces-apm-*`, `logs-apm-*`, `metrics-apm-*`.

---

### 7. (Optional) **Send Logs via Filebeat or OpenTelemetry Collector**

**elastic-apm-node itself does not directly ship application logs like Winston logs to Elastic**. You can send logs from your app by:

* Using Filebeat/Elastic Agent
* Using OpenTelemetry Collector with `otlp => APM Server` integration
* Or ship logs directly with `pino`, `winston`, or Python `logging` to file and collect.

---

## Use Cases

| Feature        | How to Use                                    |
| -------------- | --------------------------------------------- |
| **Traces**     | Elastic APM or OpenTelemetry SDK → APM Server |
| **Metrics**    | OTEL SDK → APM Server → Elastic               |
| **Logs**       | Filebeat / Elastic Agent → Elasticsearch      |
| **Dashboards** | Kibana → Create Dashboards                    |

---

