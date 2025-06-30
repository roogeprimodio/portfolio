# Jagdish Odedara - Personal Portfolio

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

A dynamic and modern personal portfolio built with Next.js and Tailwind CSS, showcasing my skills and projects through a sleek, animated, and fully responsive interface.

**Live Demo:** [your-portfolio-url.com](https://your-portfolio-url.com) *(replace with your domain)*

---

<!-- ![Portfolio Screenshot](./public/screenshot.png) -->

## ✨ Key Features

-   **Modern UI/UX**: Sleek, futuristic design with a seamless dark/light mode transition.
-   **Animated & Interactive**: Engaging user experience with fluid animations powered by Framer Motion.
-   **Fully Responsive**: Optimized for all screen sizes, from mobile phones to desktop monitors.
-   **Component-Based Architecture**: Built with reusable React components using the excellent ShadCN UI library.
-   **SEO Optimized**: Complete metadata implementation for enhanced search engine visibility and social media sharing.
-   **Functional Contact Form**: Integrated with Resend to forward messages directly to your email.
-   **Downloadable Resume**: A modal that allows visitors to preview and download a PDF version of the resume.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a file named `.env.local` in the root of your project.
    -   Add the following variables, replacing the placeholder values with your actual data. This is required for the contact form to work.
        ```env
        # Get your API key from https://resend.com
        RESEND_API_KEY="YOUR_RESEND_API_KEY"

        # The email address you want to receive messages at
        EMAIL_TO="your-email@example.com"
        ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Remember to set the environment variables (`RESEND_API_KEY`, `EMAIL_TO`) in your Vercel project settings.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
