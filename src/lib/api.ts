// get the data for a single listing
export async function getListing(id: string | number): Promise<any> {
   try {
      const response = await fetch(`/api/get-residential?id=${id}`);

      if (!response.ok) {
         console.log("ok");
         if (response.status === 404) {
            throw new Error("Listing not found");
         }
         throw new Error("Failed to fetch listing");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching listing:", error);
      throw error;
   }
}
