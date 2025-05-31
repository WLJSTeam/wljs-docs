---
sidebar_position: 1
enableComments: true
sidebar_class_name: green
slug: /setup
title: Installation Guide
---





# <h1 style={{color:'var(--ifm-color-primary)'}}> Installation Guide 📥</h1>

import Link from '@docusaurus/Link';

import styles from './styles.module.css'


__Step 1__: download and install [freeware Wolfram Engine](https://www.wolfram.com/engine/) for developers.

__Step 2__: install WLJS from the binaries hosted at Github or homebrew.

Alternatively you can skip __steps 1, 2__ and use a __complete Docker Image__ (see further).


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="apple" label="Mac" default>
    <ul>
      <li><Link to="https://github.com/WLJSTeam/wolfram-js-frontend/releases/download/v2.7.6/wljs-notebook-2.7.6-arm64-macos.dmg">Apple Silicon</Link></li>
      <li><Link to="https://github.com/WLJSTeam/wolfram-js-frontend/releases/download/v2.7.6/wljs-notebook-2.7.6-x64-macos.dmg">Intel</Link></li>
    </ul>
  </TabItem>
  <TabItem value="orange" label="Window">
    <ul>
      <li><Link to="https://github.com/WLJSTeam/wolfram-js-frontend/releases/download/v2.7.6/wljs-notebook-2.7.6-x64-win.exe">x86/64</Link></li>
    </ul>
  </TabItem>
  <TabItem value="banana" label="GNU/Linux">
    <ul>
      <li><Link to="https://github.com/WLJSTeam/wolfram-js-frontend/releases/download/v2.7.6/wljs-notebook-2.7.6-amd64-gnulinux.deb">x86/64</Link></li>
      <li><Link to="https://github.com/WLJSTeam/wolfram-js-frontend/releases/download/v2.7.6/wljs-notebook-2.7.6-arm64-gnulinux.deb">ARM64</Link></li>
    </ul>
  </TabItem>
  <TabItem value="baba" label="Docker">

```bash
docker run -it \
  -v wljs_data:/wljs \
  -v ~/wljs:"/home/wljs/WLJS Notebooks" \
  -v ~/wljs/Licensing:/home/wljs/.WolframEngine/Licensing \
  -e PUID=$(id -u) \
  -e PGID=$(id -g) \
  -p 8000:3000 \
  --name wljs \
  ghcr.io/jerryi/wolfram-js-frontend:main
```

  </TabItem>
  <TabItem value="is" label="Homebrew">
  
```bash  
brew install --cask wljs-notebook
```

  </TabItem>
</Tabs>

see also

<Link className={styles.link} to="https://github.com/JerryI/wolfram-js-frontend/releases">All releases</Link>



### Windows
Download and install the latest `.exe`. *Only x86/64-bit architecture is supported*

### Linux
##### Using `.deb` Package (Recommended)
```bash
sudo apt install ./wljs-notebook.deb
```
⚠ *Ubuntu 24.04 users*: If you encounter AppArmor issues, run:
```bash
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
```

##### Using `.zip` Archive
Extract and run the `wljs-notebook` executable.

### macOS
##### Using `.dmg` Installer
- Apple Silicon users: Download the `-arm64.dmg` version.
- Intel Mac users: Use the regular `.dmg` version.

##### Using Homebrew
```bash
brew install --cask wljs-notebook
```

---




## 🚢 Running using Docker

:::note
Certain features such as image/sound recording might require `https` connection if you are running it __not on a local machine__. See how to set up a proxy in [📦 Docker Container Setup](https://github.com/JerryI/wolfram-js-frontend/blob/main/container/README.md)
:::

__Step 1__: register and get developer license for [freeware Wolfram Engine](https://www.wolfram.com/engine/) at wolfram.com

__Step 2__: deploy WLJS Notebook in a single line of code to any machine!

```bash
docker run -it \
  -v wljs_data:/wljs \
  -v ~/wljs:"/home/wljs/WLJS Notebooks" \
  -v ~/wljs/Licensing:/home/wljs/.WolframEngine/Licensing \
  -e PUID=$(id -u) \
  -e PGID=$(id -g) \
  -p 8000:3000 \
  --name wljs \
  ghcr.io/jerryi/wolfram-js-frontend:main
```

Then open `http://127.0.0.1:8000` 

**🛠️ [GitHub Repo](https://github.com/JerryI/wolfram-js-frontend)**  
[📦 Docker Container Setup](https://github.com/JerryI/wolfram-js-frontend/blob/main/container/README.md)

In the case if you do not have `docker`, clone it directly from the repository as follows.

:::warning
Some features require WLJS Desktop App:
- `Export[_, _, "PDF"]` - export to PDF
- `Rasterize` - expressions rasterization
- `SystemOpen` - open files/folders using OS system calls
- `SystemInputDialog` - open system file dialog
- automatic core updates
:::




## <span style={{color:'var(--ifm-color-primary)'}}> ⚙️ Running WLJS Notebook as a Local Server</span>

:::note
Certain features such as image/sound recording might require `https` connection if you are running it __not on a local machine__
:::

You can run WLJS Notebook without a desktop app—just using `wolframscript`.

```bash
git clone https://github.com/JerryI/wolfram-js-frontend
cd wolfram-js-frontend
wolframscript -f Scripts/start.wls
```

For a specific hostname and port setup:

```bash
wolframscript -f Scripts/start.wls host 0.0.0.0 http 8080 ws 8081 ws2 8082 docs 8085
```

Additional options:
```bash
wolframscript -f Scripts/start.wls folder "Demos"  # Set home folder
wolframscript -f Scripts/start.wls noautolaunch True  # Disable autolaunch
```

### On-demand license

If you want to try WLJS Notebook without binding the free license to your machine, you can issue [license entitlement](https://reference.wolfram.com/language/ref/CreateLicenseEntitlement.html) using Wolfram Cloud or a friend. Then

```bash
git clone https://github.com/JerryI/wolfram-js-frontend
cd wolfram-js-frontend
wolframscript -f Scripts/start.wls -entitlement XXX-CODE-OF-ENTITLEMENT-XXX
```

*Note: in this regime the evaluation kernel works much slower*

---

<div style={{textAlign: 'center', display: 'flex', gap: '2rem', justifyContent: 'center'}}>


[🔬 __Explore Examples__](https://jerryi.github.io/wljs-docs/wljs-demo/intro-notebook)

[📺 __Demonstration Project__](https://jerryi.github.io/wljs-docs/wljs-demo)

</div>


---



## <span style={{color:'var(--ifm-color-primary)'}}> 🔗 Useful Links</span>



- **📘 [Wolfram Language](./Wolfram%20Language.md)**  
- **📺 [Live Demos](https://jerryi.github.io/wljs-docs/wljs-demo)**  
- **🛠️ [GitHub Repo](https://github.com/JerryI/wolfram-js-frontend)**  
- **💬 [Community](https://github.com/JerryI/wolfram-js-frontend/discussions)** 
- [🐴 __Telegram__](https://t.me/+PBotB9UJw-hiZDEy)




##  <span style={{color:'var(--ifm-color-primary)'}}>⚖️ Licensing</span>



WLJS Notebooks (including all extensions, frontend and backend) is __licensed under GPLv3__ 👩🏼‍⚖️ The algorithms, functions, and other components of __Wolfram Language__ provided by the Wolfram Engine are the intellectual property of Wolfram Research, Inc. See the <a href="https://www.wolfram.com/legal/terms/wolfram-engine.html">license agreement</a> for details.