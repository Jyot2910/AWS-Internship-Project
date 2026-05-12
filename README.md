# AWS-Internship-Project

# 🪣 Jyot's Gallery — AWS EC2 + S3 Project

A photo gallery web application hosted on **AWS EC2** (Ubuntu) with images served from **Amazon S3**. Built with Node.js and Express.js.

---

## 🚀 Live Demo

```
http://<your-ec2-public-ip>
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **AWS EC2** | Ubuntu server to host the Node.js app |
| **Amazon S3** | Store and serve gallery images publicly |
| **Node.js v18** | Backend runtime |
| **Express.js** | Web framework |
| **HTML/CSS** | Frontend gallery UI |

---

## 📁 Project Structure

```
jyot-gallery/
├── public/
│   └── completion.html     # Gallery frontend
├── server.js               # Express server
├── package.json
└── README.md
```

---

## ⚙️ Setup & Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/jyot-gallery.git
cd jyot-gallery
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure AWS CLI

```bash
aws configure
# Enter your AWS Access Key, Secret Key, Region (ap-south-1), and output format (json)
```

### 4. Create S3 Bucket

```bash
aws s3api create-bucket \
  --bucket jyot-gallery-bucket \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1
```

### 5. Disable Block Public Access

```bash
aws s3api put-public-access-block \
  --bucket jyot-gallery-bucket \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

### 6. Add Public Bucket Policy

```bash
aws s3api put-bucket-policy \
  --bucket jyot-gallery-bucket \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::jyot-gallery-bucket/*"
      }
    ]
  }'
```

### 7. Upload Images to S3

```bash
aws s3 cp ./images/ s3://jyot-gallery-bucket/gallery/ --recursive
```

### 8. Run the App on EC2

```bash
sudo node server.js
```

App will be live at `http://<your-ec2-public-ip>`

---

## 🖼️ Image URLs Format

Once uploaded, images are accessible via:

```
https://jyot-gallery-bucket.s3.ap-south-1.amazonaws.com/gallery/<image-name>.jpg
```

---

## 🔒 EC2 Security Group Settings

Make sure your EC2 instance has these inbound rules:

| Type  | Protocol | Port | Source    |
|-------|----------|------|-----------|
| HTTP  | TCP      | 80   | 0.0.0.0/0 |
| HTTPS | TCP      | 443  | 0.0.0.0/0 |
| SSH   | TCP      | 22   | Your IP   |

---

## 📦 AWS Services Used

- **EC2** — t2.micro (Free Tier) · Ubuntu 22.04 LTS
- **S3** — Standard storage class · Public read access
- **IAM** — Access key for CLI authentication

---

## 👤 Author

**Jyot**  
AWS EC2 + S3 Project · Node.js · Express.js

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
