[![banner](./.doc/assets/banner.png)](https://youtu.be/zPXIaCAu9xA)

<div align="center">

# Welcome to Lyra

Lyra, named after the constellation representing the lyre of Orpheus in Greek mythology, brings a touch of celestial charm to your Linux Assistant. Just as the stars in the night sky guide sailors, Lyra is designed to navigate the vast sea of information in the digital world, making your computing experience harmonious and intuitive.

</div>

### What is Lyra?

Lyra acts as a guiding star, providing intuitive assistance and streamlining common tasks. Whether you're a seasoned Linux user or a beginner, Lyra is an open-source Linux Virtual Assistant (Yeah, like Cortana from Halo) designed to simplify the computing experience for users of GNU/Linux systems

### Features

- Electron Client: Lyra utilizes Electron to provide a seamless and robust client experience, combining the power of web technologies with native performance.
- Rich LLM: A sophisticated Language Learning Model (LLM) powers Lyra, enabling intelligent and context-aware interactions.
- Simple Interface: The user interface is designed to be intuitive and straightforward, ensuring ease of use for all users.
- Track Metrics: Lyra includes features to monitor and track system metrics, helping users keep an eye on their system performance.

#### Prerequisites

- It's mandatory to have `pip` or `coda` installed, also `python v3.10` and `nodejs v20^` are mandatory, `npm`, `yarn` or `pnpm` are necessary for **developer**
- Ensure you have `pacman`, `apt`, or the capability to handle `.tar.gz` files, depending on your Linux distribution.

### Installation and Setup

##### Setup

To setup the project as and user you can simple copy-paste the following json file at `.config/lyra/config.json`

```json
{
  "nodeEnv": "production",
  "lyraUrl": "",
  "firebase": "",
  "ngrokPort": 4040,
  "host": "http://127.0.0.1",
  "apiPort": 5000,
  "mode": 1,
  "verbose": 0
}
```

##### Installation

Lyra can be installed using packages available for various Linux package managers. Below are the steps to install Lyra on your system:

> Note: Each VERSION is labeled as X.Z.Y-state X meaning major version, Z meaning minor version and Y as patch; -state means state of the build if there's no a -state for example 1.0.0 it means latest

###### For Arch Linux (Or derivates) - Using pacman

Download the lyra.VERSION.pacman package file from this repository at [lyra.1.0.0-beta.pacman](https://github.com/AndresMpa/lyra/releases/download/beta/lyra-1.0.0-beta.pacman)

```sh
sudo pacman -U lyra.pacman
```

###### For Ubuntu (Or derivates) - Using dpkg

Download the lyra.VERSION.deb package file from this repository at [lyra.1.0.0-beta_amd64.deb](https://github.com/AndresMpa/lyra/releases/download/beta/lyra_1.0.0-beta_amd64.deb)

```sh
sudo dpkg -i lyra.deb
```

###### Generic solution for GNU/Linux systems - Using tar.gz

Download the lyra.VERSION.tar.gz package file from this repository at [lyra.1.0.0-beta.tar.gz](https://github.com/AndresMpa/lyra/releases/download/beta/lyra-1.0.0-beta.tar.gz)

```sh
tar -xvzf lyra.tar.gz
cd lyra
chmod +x install.sh
./install.sh
```
