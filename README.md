# 📸 Ionic Photo Gallery

A cross-platform mobile application built with **Ionic**, **Angular**, and **Capacitor**. This app allows users to take photos with their device camera, store them in the filesystem, and view them in a persistent gallery grid.

## 🚀 Features
* **Native Camera Access**: Uses `@capacitor/camera` to capture high-quality photos.
* **Persistent Storage**: Photos are saved to the device filesystem and metadata is stored via `@capacitor/preferences` so photos remain after the app is closed.
* **Cross-Platform**: Designed to run on **Web**, **Android**, and **iOS** from a single codebase.
* **Responsive Gallery**: A clean grid view to display captured images.

## 🛠️ Tech Stack
* **Framework**: [Ionic Framework](https://ionicframework.com/)
* **Platform Bridge**: [Capacitor](https://capacitorjs.com/)
* **Language**: TypeScript / Angular
* **Tools**: Android Studio (for native builds)

## 📦 How to Run Locally

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/photo-gallery.git](https://github.com/Banteas/photo-gallery.git)
cd photo-gallery
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run on Web
```bash
ionic serve
```

### 4. Build for Android
To generate the native Android project and run it on a device:
```bash
ionic build
npx cap add android # Only if the android folder is missing
npx cap sync
npx cap open android
```

## 📝 Lessons Learned
- Navigating Windows Execution Policies for CLI scripts.

- Configuring Android Developer Options and USB Debugging.

- Handling native device permissions (Camera/Filesystem).

- Managing Git workflows for cross-platform projects.