// "use server"
// import { eq } from "drizzle-orm";
// import { db } from "../src/server/db/index"
// import { user } from "../src/server/db/auth-schema"
// import type { User } from '@/types'; 

// export const getAllUsers = async () => {
//     try {
//         const data = await db.select().from(user);
//         console.log(data)
//         return data
//     } catch {
//         console.error('Error, users not found')
//     }

// }

// export const getUser = async (userId: string) => { 
//   try {
//     const data = await db.select().from(user).where(eq(user.id, userId));
//     console.log(data)
//     return data; 
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error; 
//   }
// };

// export const addUser = async (user: User) => {
//     try {
//       const result = await db
//         .insert(user)
//         .values({
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           image: user.image,
//         })
  
//       console.log('Inserted user:', result);
//     } catch (error) {
//       console.error('Error adding new user:', error);
//     }
//   };
  