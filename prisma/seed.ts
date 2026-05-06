import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Created admin user:", admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "strategy" },
      update: {},
      create: { name: "Strategy", slug: "strategy" },
    }),
    prisma.category.upsert({
      where: { slug: "family" },
      update: {},
      create: { name: "Family", slug: "family" },
    }),
    prisma.category.upsert({
      where: { slug: "party" },
      update: {},
      create: { name: "Party", slug: "party" },
    }),
    prisma.category.upsert({
      where: { slug: "cooperative" },
      update: {},
      create: { name: "Cooperative", slug: "cooperative" },
    }),
  ]);
  console.log("✅ Created categories");

  // Create products
  const products = [
    {
      name: "Catan",
      description:
        "In Catan, players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players collect these resources to build up their civilizations to get to 10 victory points and win the game.",
      price: 49.99,
      stock: 25,
      images: ["https://placehold.co/600x600/6366f1/white?text=Catan"],
      publisher: "Catan Studio",
      playerCount: "3-4 players",
      playTime: "60-120 min",
      age: "10+",
      categoryId: categories[0].id,
    },
    {
      name: "Ticket to Ride",
      description:
        "Ticket to Ride is a cross-country train adventure where players collect cards of various types of train cars that enable them to claim railway routes connecting cities in various countries around the world.",
      price: 54.99,
      stock: 30,
      images: ["https://placehold.co/600x600/ec4899/white?text=Ticket+to+Ride"],
      publisher: "Days of Wonder",
      playerCount: "2-5 players",
      playTime: "30-60 min",
      age: "8+",
      categoryId: categories[1].id,
    },
    {
      name: "Pandemic",
      description:
        "In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand.",
      price: 39.99,
      stock: 20,
      images: ["https://placehold.co/600x600/10b981/white?text=Pandemic"],
      publisher: "Z-Man Games",
      playerCount: "2-4 players",
      playTime: "45 min",
      age: "8+",
      categoryId: categories[3].id,
    },
    {
      name: "Codenames",
      description:
        "Codenames is a social word game with a simple premise and challenging game play. Two teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the board.",
      price: 19.99,
      stock: 40,
      images: ["https://placehold.co/600x600/f59e0b/white?text=Codenames"],
      publisher: "Czech Games Edition",
      playerCount: "2-8+ players",
      playTime: "15 min",
      age: "14+",
      categoryId: categories[2].id,
    },
    {
      name: "Wingspan",
      description:
        "Wingspan is a competitive, medium-weight, card-driven, engine-building board game. You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves.",
      price: 64.99,
      stock: 15,
      images: ["https://placehold.co/600x600/8b5cf6/white?text=Wingspan"],
      publisher: "Stonemaier Games",
      playerCount: "1-5 players",
      playTime: "40-70 min",
      age: "10+",
      categoryId: categories[0].id,
    },
    {
      name: "Azul",
      description:
        "Introduced by the Moors, azulejos (originally white and blue ceramic tiles) were fully embraced by the Portuguese when their king Manuel I, on a visit to the Alhambra palace in Southern Spain, was mesmerized by the stunning beauty of the Moorish decorative tiles.",
      price: 39.99,
      stock: 22,
      images: ["https://placehold.co/600x600/3b82f6/white?text=Azul"],
      publisher: "Plan B Games",
      playerCount: "2-4 players",
      playTime: "30-45 min",
      age: "8+",
      categoryId: categories[1].id,
    },
    {
      name: "7 Wonders",
      description:
        "You are the leader of one of the 7 great cities of the Ancient World. Gather resources, develop commercial routes, and affirm your military supremacy. Build your city and erect an architectural wonder which will transcend future times.",
      price: 49.99,
      stock: 18,
      images: ["https://placehold.co/600x600/ef4444/white?text=7+Wonders"],
      publisher: "Repos Production",
      playerCount: "2-7 players",
      playTime: "30 min",
      age: "10+",
      categoryId: categories[0].id,
    },
    {
      name: "Splendor",
      description:
        "Splendor is a game of chip-collecting and card development. Players are merchants of the Renaissance trying to buy gem mines, means of transportation, shops—all in order to acquire the most prestige points.",
      price: 39.99,
      stock: 28,
      images: ["https://placehold.co/600x600/14b8a6/white?text=Splendor"],
      publisher: "Space Cowboys",
      playerCount: "2-4 players",
      playTime: "30 min",
      age: "10+",
      categoryId: categories[0].id,
    },
    {
      name: "Dixit",
      description:
        "Each turn in Dixit, one player is the storyteller, chooses one of the six cards in their hand, then makes up a sentence based on that card's image and says it out loud without showing the card to the other players.",
      price: 34.99,
      stock: 25,
      images: ["https://placehold.co/600x600/a855f7/white?text=Dixit"],
      publisher: "Libellud",
      playerCount: "3-6 players",
      playTime: "30 min",
      age: "8+",
      categoryId: categories[2].id,
    },
    {
      name: "Carcassonne",
      description:
        "Carcassonne is a tile-placement game in which the players draw and place a tile with a piece of southern French landscape on it. The tile might feature a city, a road, a cloister, grassland or some combination thereof, and it must be placed adjacent to tiles that have already been played.",
      price: 34.99,
      stock: 30,
      images: ["https://placehold.co/600x600/eab308/white?text=Carcassonne"],
      publisher: "Z-Man Games",
      playerCount: "2-5 players",
      playTime: "30-45 min",
      age: "7+",
      categoryId: categories[1].id,
    },
    {
      name: "King of Tokyo",
      description:
        "In King of Tokyo, you play mutant monsters, gigantic robots, and strange aliens—all of whom are destroying Tokyo and whacking each other in order to become the one and only King of Tokyo.",
      price: 44.99,
      stock: 20,
      images: ["https://placehold.co/600x600/f97316/white?text=King+of+Tokyo"],
      publisher: "Iello",
      playerCount: "2-6 players",
      playTime: "30 min",
      age: "8+",
      categoryId: categories[2].id,
    },
    {
      name: "Forbidden Island",
      description:
        "Forbidden Island is a visually stunning cooperative board game. Instead of winning by competing with other players like most games, everyone must work together to win the game. Players take turns moving their pawns around the 'island', which is built by arranging the many beautifully screen-printed tiles before play begins.",
      price: 24.99,
      stock: 35,
      images: ["https://placehold.co/600x600/06b6d4/white?text=Forbidden+Island"],
      publisher: "Gamewright",
      playerCount: "2-4 players",
      playTime: "30 min",
      age: "10+",
      categoryId: categories[3].id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: product,
    });
  }
  console.log(`✅ Created ${products.length} products`);

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
