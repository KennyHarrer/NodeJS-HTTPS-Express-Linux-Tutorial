# Node.js SSL Configuration Tutorial with Certbot on Arch Linux

This guide provides a step-by-step tutorial for setting up a Node.js server with SSL using Certbot on Arch Linux.

## Prerequisites

- Arch Linux system
- Basic understanding of Node.js and Linux commands

## Step 1: Installing Node.js, NPM, and Certbot

### Node.js and NPM

1. Update your package repository:
   ```bash
   sudo pacman -Syu
   ```

2. Install Node.js and NPM:
   ```bash
   sudo pacman -S nodejs npm
   ```

### Certbot

1. Install Certbot:
   ```bash
   sudo pacman -S certbot
   ```

## Step 2: Obtaining SSL Certificates with Certbot

For automating SSL certificate retrieval, we'll my custom Node.js script available in at [nodejs-auto-certbot](https://github.com/KennyHarrer/nodejs-auto-certbot).

1. Clone the repository:
   ```bash
   git clone https://github.com/KennyHarrer/nodejs-auto-certbot
   ```

2. Navigate to the cloned directory:
   ```bash
   cd nodejs-auto-certbot
   ```

3. Follow the instructions in the repository to run the script and obtain the SSL certificates.

## Step 3: Configuring Permissions for SSL Certificates

Certbot stores certificates in `/etc/letsencrypt/live/` and `/etc/letsencrypt/archive/`. We need to grant the appropriate user or group access to these directories. I usually just give the wheel group access to read, so if you want to do that to you can use the following approach.

1. Add your user to the `wheel` group (if not already a member):
   ```bash
   sudo usermod -aG wheel [your_username]
   ```

2. Change the group ownership of the directories to `wheel`:
   ```bash
   sudo chown -R root:wheel /etc/letsencrypt/live/
   sudo chown -R root:wheel /etc/letsencrypt/archive/
   ```

3. Set the permissions to allow group read access:
   ```bash
   sudo chmod -R 750 /etc/letsencrypt/live/
   sudo chmod -R 750 /etc/letsencrypt/archive/
   ```
## Step 4: Granting Node.js Permission to Bind to Privileged Ports

In Unix-like operating systems, regular users cannot bind sockets to privileged ports (those below 1024). However, since we want our Node.js server to listen on ports like 80 (HTTP) or 443 (HTTPS), we need to grant Node.js this capability.

To do this, we'll use the `setcap` command, which allows us to set specific capabilities for a program. We'll grant Node.js the `cap_net_bind_service` capability, enabling it to bind to these privileged ports.

Follow these steps to grant Node.js this permission:

1. First, locate the Node.js executable. It's typically located at `/usr/bin/node`, but you can confirm its location with the `which` command:
   ```bash
   which node
   ```

2. Once you've confirmed the path to the Node.js executable, use the `setcap` command to grant it the `cap_net_bind_service` capability. Replace `/usr/bin/node` in the command below with the path you found if it's different:
   ```bash
   sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node
   ```

3. After running this command, Node.js will have the necessary permissions to bind to privileged ports on your system.

---

With this final step, your Node.js server on Arch Linux should now be fully set up with SSL encryption using Certbot, and have the capability to bind to privileged ports. Ensure to test your server to confirm that it's running correctly and utilizing the SSL certificates.

## Step 5: Configuring Your Node.js Server

1. Inside the this repository, you'll find an [example Node.js server configuration that uses SSL certificates]().

2. Review and modify the server configuration as necessary for your specific use case.

3. Run your Node.js server with the updated configuration to ensure it uses the SSL certificates.

---

By following these steps, you should have a Node.js server running on Arch Linux with SSL encryption using Certbot.