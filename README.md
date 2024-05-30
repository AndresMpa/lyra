![banner](./.doc/assets/banner.png)

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

Lyra can be installed using packages available for various Linux package managers. Below are the steps to install Lyra on your system:

##### Installation

###### For Arch Linux (Or derivates) - Using pacman

Download the lyra.VERSION.pacman package file from this repository at [./package/lyra.1.0.0.pacman](./package/lyra.1.0.0.pacman)

```sh
sudo pacman -U lyra.pacman
```

###### For Ubuntu (Or derivates) - Using dpkg

Download the lyra.VERSION.deb package file from this repository at [./package/lyra.1.0.0.deb](./package/lyra.1.0.0.deb)

```sh
sudo dpkg -i lyra.deb
```

###### Generic solution for GNU/Linux systems - Using tar.gz

Download the lyra.VERSION.tar.gz package file from this repository at [./package/lyra.1.0.0.tar.gz](./package/lyra.1.0.0.tar.gz)

```sh
tar -xvzf lyra.tar.gz
cd lyra
sudo ./install.sh
```
