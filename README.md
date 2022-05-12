# S3 Configuration

Make sure that S3 allows request from `localhost:3000`. Inorder to achieve that navigate to `your-s3-bucket > permissions > CORS` and paste the following configuration.

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000"],
    "ExposeHeaders": []
  }
]
```
