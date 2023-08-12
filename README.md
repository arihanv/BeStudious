# BeStudious - Your Ultimate Learning Hub! 🚀🎓

BeStudious is a dynamic online learning community designed to redefine your educational experience and foster continuous growth and collaboration.

## Demo Video

[![Demo Video](http://img.youtube.com/vi/LqrgWfMvolo/0.jpg)](http://www.youtube.com/watch?v=LqrgWfMvolo)

## Join the BeStudious Community

🌟 https://BeStudious.vercel.app 🌟

## About BeStudious

BeStudious is a student-driven platform that goes beyond traditional education, providing you with daily AI-generated prompts, interactive learning feeds, trivia challenges, and a supportive community of learners from diverse backgrounds.

BeStudious was envisioned and created by a passionate team of high schoolers, driven by the belief that learning knows no bounds. We have crafted this platform to empower students in their pursuit of knowledge.

### Key Highlights:

1️⃣ **Daily AI-Generated Prompts:** Elevate your learning with engaging daily prompts tailored to expand your horizons and challenge your skills. 🧠📖

2️⃣ **Interactive Learning Feed:** Share your learning journey by uploading snapshots based on the prompts. Inspire and motivate fellow learners with your dedication. 📸🎯

3️⃣ **Trivia Challenges:** Test your knowledge and earn points by answering intriguing daily trivia questions across various subjects. 🧐🔍

## Getting Started

To get started with BeStudious, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/arihanv/BeStudious.git
   ```

2. **Install Dependencies:**

   Navigate to the project directory and install the required dependencies:

   ```bash
   cd BeStudious
   npm install
   ```

3. **Set Environment Variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```dotenv
   NEXT_PUBLIC_DISCORD_WEBHOOK_URL=<your_discord_webhook_url>
   NEXT_PUBLIC_PROJECT_URL=<your_supabase_project_url>
   NEXT_PUBLIC_SERVICE_ROLE_KEY=<your_supabase_service_role_key>
   ```

4. **Build Supabase Edge Functions:**

   Build the Supabase Edge functions in `/supabase/functions`.

5. **Set Edge Function Environment Variables:**

   Create a `.env` file in the `supabase/functions` directory and add the following environment variable:

   ```dotenv
   OPENAI_API_KEY=<your_openai_api_key>
   ```

6. **Serve Edge Functions:**

   Run the following command to serve the edge functions locally:

   ```bash
   supabase functions serve --supabase/functions/.env
   ```

7. **Deploy to Vercel:**

   You can easily deploy the entire project on Vercel using the button below:

   [![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project)
