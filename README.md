# onTrack
![TempImage](/temp.png)

## What it does
onTrack is a Chrome extension that helps you stay focused by blocking distracting websites. When you start studying, you enter your topic, and onTrack dynamically restricts access to unrelated sites, keeping you productive.

## Inspiration
Our inspiration for onTrack came from the challenges of staying focused during study sessions. It’s easy to sidetrack into videos or unrelated tasks, so we wanted a dynamic tool to keep us on track and minimize distractions seamlessly.

## How we built it
We built our frontend using Vite for its speed and simplicity, paired with Tailwind CSS for rapid and customizable styling. For the backend, we used Express to handle API calls and manage server-side logic. This combination allowed us to create a responsive and visually appealing interface while ensuring seamless communication between the client and server. By integrating APIs effectively, we enabled dynamic filtering and user-specific functionality, delivering a robust and cohesive experience.

## Challenges we ran into
We faced challenges in leveraging language models to filter web-scraped information based on the page the user is currently visiting. Issues arose with crafting effective prompts for the LLM, requiring us to iterate and refine our approach. Additionally, we explored various methods to improve similarity scoring, such as implementing cosine similarity, to ensure more accurate filtering and functionality.

## Accomplishments that we're proud of
We're proud to have successfully built the base level of onTrack, ensuring it functions smoothly. Despite being a new team, we collaborated effectively and pushed ourselves to try new technologies outside our comfort zone.

## What we learned
We learned that working with large language models (LLMs) can be both powerful and challenging. LLMs are highly unpredictable and not a one-size-fits-all solution. They require constant fine-tuning and experimentation with input prompts to achieve desirable outcomes. This process highlighted the importance of understanding model behavior and iterating to improve results, emphasizing that LLMs are a tool—not a replacement—for thoughtful problem-solving.

## What's next for onTrack
We aim to refine the detection of similar topics to make the app even more accurate and adaptive. Additionally, we plan to incorporate computer vision to identify behavioral distractions and provide timely reminders to help users stay focused.