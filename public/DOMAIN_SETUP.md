# Custom Domain Setup Guide 🌐

This guide explains how to point your custom domain (e.g., `imvelotripsindia.com`) to this application, and how to verify that everything works correctly without changing any code or hardcoding IP addresses.

---

## ☁️ Setting Up Custom Domain on Cloud Run

Since your application runs as a Dockerized Node/Express full-stack container on **Google Cloud Run**, domain mapping is handled securely at the infrastructure level. This means **no server or client code changes are required** when pointing to a custom domain.

### Step-by-Step Instructions:

### 1. Register or Manage Your Custom Domain
Log in to your Domain Registrar workspace (e.g., **GoDaddy**, **Hostinger**, **Cloudflare**, **Namecheap**, or **Google Domains**).

### 2. Map the Domain in Google Cloud Console
1. Open the **Google Cloud Console** and navigate to **Cloud Run**.
2. Select your service name (your running container).
3. Click on the **Manage Custom Domains** button in the top action bar (or navigate to *Cloud Run > Domain Mappings*).
4. Click **Add Mapping**.
5. Select your Cloud Run service and enter your verified domain (e.g., `imvelotripsindia.com` or `www.imvelotripsindia.com`).
6. Follow the prompt to verify ownership of your domain name (Google will guide you to add a temporary TXT verification record at your domain registrar).

### 3. Configure Your DNS Records
Once Cloud Run maps the domain, it will provide you with the specific **DNS Records** to insert.
1. Go back to your Domain Registrar's **DNS Zone Editor**.
2. Add the records exactly as provided by Cloud Run:
   - **For Subdomains (e.g., `www.imvelotripsindia.com`):** Add a **CNAME** record pointing `www` to the alias provided by Google Cloud (e.g., `ghs.googlehosted.com.`).
   - **For Root Domains (e.g., `imvelotripsindia.com`):** Add **A** or **AAAA** records pointing to the Google IP addresses supplied on screen.
3. Save the changes. 

> ⏳ *Note: DNS changes usually take between 5 minutes to a few hours to propagate globally.*

---

## ⚡ Why This Is 100% Git-Proof & Safe
Our codebase uses **relative URL paths** in the frontend components (e.g., calling `fetch("/api/generate")` instead of an absolute IP like `http://192.168.1.1/api/generate`).

This offers massive benefits:
- **Portability:** When you sync or pull changes to Git, the app automatically adapts.
- **Dynamic Origin:** The browser will naturally resolve API routes against whichever domain it is currently loaded from system-wide.
- **No IP Downtime:** You will never have to search and replace IP strings in your source code.
