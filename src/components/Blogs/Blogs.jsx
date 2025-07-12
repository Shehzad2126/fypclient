import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import organic from "../../assets/organicvege.jpg";
import tool from "../../assets/tools.jpg";
import market from "../../assets/market.jpg";

export const blogPosts = [
  {
    id: 1,
    title: "How to Grow Organic Vegetables",
    description:
      "Learn step-by-step methods to grow healthy organic vegetables on your farm.",
    image: organic,
    category: "Organic Farming",
    tags: ["organic", "vegetables"],
    date: "April 18, 2025",
    fullContent: `🥕 How to Grow Organic Vegetables
April 18, 2025 | Category: Organic Farming | Tags: #organic #vegetables

🌱 Introduction
Organic vegetable gardening is more than just avoiding chemicals—it's about working with nature to grow food that's healthy, sustainable, and eco-friendly. Whether you're a beginner or a seasoned farmer, this guide will walk you through the essentials of growing your own organic vegetables.

🧑‍🌾 Step-by-Step Guide to Growing Organic Vegetables
1. Choose the Right Location
Your garden's success begins with location:

Pick a spot with 6–8 hours of sunlight per day.

Ensure good soil drainage and minimal wind exposure.

2. Prepare Organic Soil
Healthy soil is the foundation of organic farming:

Mix in compost made from kitchen waste, leaves, and manure.

Add natural amendments like neem cake, bone meal, or rock phosphate.

Maintain a soil pH between 6.0–7.0 for most vegetables.

3. Select Certified Organic Seeds
Choose seeds that are:

Certified organic and non-GMO.

Adapted to your local climate for best performance.

4. Practice Crop Rotation
Crop rotation prevents nutrient loss and pest buildup:

Rotate crops by type: leafy greens, root crops, and fruiting vegetables.

Example: Tomatoes one season, carrots the next.

5. Water Wisely
Proper watering keeps plants healthy:

Water early morning or late evening.

Use drip irrigation or watering cans to avoid overwatering.

Apply mulch to retain moisture and suppress weeds.

6. Control Pests Naturally
Avoid harmful pesticides with these tips:

Spray plants with neem oil or garlic-chili spray.

Attract beneficial insects like ladybugs and bees.

Companion planting: grow basil, mint, or marigolds near your vegetables to deter pests.

7. Manage Weeds Organically
Hand-pull weeds regularly.

Use organic mulch (like straw or grass clippings).

Grow cover crops in the off-season to improve soil health.

8. Harvesting Your Vegetables
Harvest when veggies are ripe for best flavor and nutrition.

Use clean, sharp tools to prevent plant damage.

🧺 Bonus Tips
Keep a gardening journal to track planting and progress.

Involve kids or family—organic gardening can be fun and educational!

Sell surplus at local markets or share with your community.`,
  },
  {
    id: 2,
    title: "Top 5 Farming Tools in 2025",
    description:
      "These tools are transforming the way farmers work and save time.",
    image: tool,
    category: "Tools & Equipment",
    tags: ["tools", "technology"],
    date: "April 15, 2025",
    fullContent: `🛠️ Top 5 Farming Tools in 2025
April 15, 2025 | Category: Tools & Equipment | Tags: #tools #technology

🌱 Introduction
Farming technology is advancing rapidly, helping farmers increase productivity and reduce labor. In 2025, the top tools are making farming smarter, more efficient, and eco-friendly. Whether you're managing a small farm or a large agricultural business, these tools will transform how you work.

🚰 1. Smart Irrigation Systems
Smart irrigation systems use sensors to monitor soil moisture and weather conditions. They automatically adjust watering schedules, saving water and ensuring crops get the right amount of hydration without waste.

🧪 2. AI-Powered Soil Sensors
AI-powered soil sensors analyze soil health by measuring nutrient levels, moisture, and pH. This real-time data helps farmers optimize fertilization, improve soil conditions, and increase crop quality.

🚜 3. Autonomous Tractors
Autonomous tractors operate without human drivers, performing plowing, planting, and harvesting tasks with precision. These tractors reduce labor costs, increase efficiency, and can work longer hours than traditional machines.

🚁 4. Drone Sprayers
Drone sprayers apply pesticides, herbicides, and fertilizers precisely over crops. They can cover large fields quickly, reach difficult areas, and reduce chemical use, making crop protection safer and more effective.

📱 5. Mobile Farm Management Apps
Mobile apps help farmers plan crops, track equipment, monitor weather, and manage sales—all from their smartphones. These tools provide valuable insights and simplify decision-making for better farm management.

🌾 Conclusion
Integrating these top farming tools can help farmers meet challenges like climate change, labor shortages, and sustainability demands. Embracing technology ensures higher productivity and a healthier environment.

📝 Bonus Tips

Stay updated on new farming technologies through workshops and online resources.

Combine tech tools with traditional farming knowledge for the best results.

Share experiences with other farmers to learn practical tips and innovations.`,
  },
  {
    id: 3,
    title: "Tips to Sell at Local Markets",
    description: "Boost your income by using these market-selling strategies.",
    image: market,
    category: "Selling & Marketing",
    tags: ["market", "sales"],
    date: "April 10, 2025",
    fullContent: `🛒 Tips to Sell at Local Markets
April 10, 2025 | Category: Selling & Marketing | Tags: #market #sales

🌟 Introduction
Selling your products at local markets is a great way to connect with customers, build your brand, and increase your income. But success requires more than just showing up. Here are some effective tips to help you stand out and boost your sales.

🎁 1. Attractive Packaging
Good packaging catches the eye and makes your product look professional. Use eco-friendly and colorful materials to make your items stand out and appeal to customers.

💰 2. Set Competitive Prices
Research prices for similar products in your area and price yours fairly. Consider your costs and profit margin but keep prices attractive to buyers.

🤝 3. Build Customer Relationships
Be friendly and approachable. Listen to customers’ needs and answer their questions patiently. Repeat customers often come from good personal interactions.

🍽️ 4. Offer Samples
Letting customers try your product increases trust and encourages purchases. Whether it’s food, cosmetics, or crafts, samples can make a big difference.

📣 5. Use Signage and Promotion
Clear, attractive signs help people find your stall. Use social media before and during market days to promote your presence and any special offers.

💳 6. Accept Digital Payments
Many customers prefer cashless payments. Offering options like mobile wallets or card readers can increase sales and convenience.

📈 Conclusion
With these tips, selling at local markets can become a rewarding and profitable experience. Preparation, presentation, and personal connection are key to success.

📝 Bonus Tips

Keep track of which products sell best to plan future stock.

Join local vendor groups to share knowledge and support.

Be consistent with your market days to build loyal customers.`,
  },
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [comments, setComments] = useState({}); // current typed comment per post
  const [allComments, setAllComments] = useState({}); // all submitted comments per post

  const handleCommentChange = (postId, comment) => {
    setComments({
      ...comments,
      [postId]: comment,
    });
  };

  const handleAddComment = (postId) => {
    const newComment = comments[postId]?.trim();
    if (!newComment) return; // ignore empty comment

    setAllComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    // Clear the input after submitting
    setComments((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(blogPosts.map((post) => post.category))];

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-7.5xl mx-auto dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">🌾 Farmers Blog</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search blog posts..."
          className="p-2 border rounded w-full sm:w-1/2 dark:text-black dark:bg-slate-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search blog posts"
        />
        <select
          className="p-2 border rounded dark:text-black dark:bg-slate-300"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter blog posts by category"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded shadow p-4 dark:bg-gray-700 dark:text-white"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-45 object-cover rounded mb-4 transform transition duration-300 translate-all group hover:scale-110 hover:-translate-y-2"
            />
            <h2 className="text-xl dark:text-white font-semibold mb-2">{post.title}</h2>
            <p className="text-sm dark:text-white text-gray-500 mb-2">
              {post.date} | {post.category}
            </p>
            <p className="text-gray-700 dark:text-white mb-3">{post.description}</p>
            <NavLink
              to={`/readmore1/${post.id}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
              aria-label={`Read more about ${post.title}`}
            >
              Read More
            </NavLink>

            {/* Comments Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>

              <div className="mb-4 max-h-32 overflow-y-auto border border-gray-300 rounded p-2 dark:border-gray-600">
                {(allComments[post.id] && allComments[post.id].length > 0) ? (
                  allComments[post.id].map((comment, idx) => (
                    <p key={idx} className="text-sm mb-1 border-b border-gray-300 dark:border-gray-600 last:border-b-0">
                      {comment}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300">No comments yet...</p>
                )}
              </div>

              <textarea
                className="p-2 border rounded w-full dark:bg-slate-300 dark:text-black resize-none"
                rows="3"
                placeholder="Add your comment..."
                value={comments[post.id] || ""}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                aria-label={`Add comment for ${post.title}`}
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                aria-label={`Post comment for ${post.title}`}
              >
                Post Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
