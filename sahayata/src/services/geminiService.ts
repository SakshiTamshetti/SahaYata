import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface SchemeRecommendation {
  name: string;
  description: string;
  benefits: string;
  eligibility_reason: string;
  eligibility_criteria: string;
  required_documents: string[];
  important_numbers: string[];
  link: string;
  icon_type: 'tractor' | 'sprout' | 'shield' | 'landmark' | 'wallet';
}

export const getSchemeRecommendations = async (userData: any, language: string): Promise<SchemeRecommendation[]> => {
  try {
    const model = "gemini-3.1-pro-preview";
    
    const prompt = `
      You are an expert in Indian Government Agricultural and Farmer Welfare Schemes.
      Based on the following farmer profile, suggest the top 3-5 most relevant government schemes they should apply for.
      
      Farmer Profile:
      - Age: ${userData.age}
      - Gender: ${userData.gender}
      - State: ${userData.state}
      - Land Size: ${userData.landSize} acres
      - Primary Crop: ${userData.primaryCrop}
      - Annual Income: ₹${userData.annualIncome}
      - Occupation: ${userData.occupation}
      - Category: ${userData.category || 'General'}
      
      Language for response: ${language === 'hi' ? 'Hindi' : 'English'}
      
      Return the response as a JSON array of objects. Each object must have:
      - name: The official name of the scheme.
      - description: A brief 2-sentence description of what the scheme is.
      - benefits: The key financial or material benefit the farmer will get.
      - eligibility_reason: Why this specific farmer is eligible based on their profile.
      - eligibility_criteria: Detailed eligibility criteria for this scheme.
      - required_documents: A list of documents needed to apply (e.g., Aadhaar, Land Records, Bank Passbook).
      - important_numbers: A list of helpline or support numbers for this scheme.
      - link: A placeholder or actual official government link if known (e.g., pmkisan.gov.in).
      - icon_type: One of ['tractor', 'sprout', 'shield', 'landmark', 'wallet'] that best fits the scheme.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              benefits: { type: Type.STRING },
              eligibility_reason: { type: Type.STRING },
              eligibility_criteria: { type: Type.STRING },
              required_documents: { type: Type.ARRAY, items: { type: Type.STRING } },
              important_numbers: { type: Type.ARRAY, items: { type: Type.STRING } },
              link: { type: Type.STRING },
              icon_type: { type: Type.STRING },
            },
            required: ["name", "description", "benefits", "eligibility_reason", "eligibility_criteria", "required_documents", "important_numbers", "link", "icon_type"],
          },
        },
      },
    });

    if (!response.text) return [];
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error getting scheme recommendations:", error);
    return [];
  }
};

export interface ApplicationCenter {
  name: string;
  address: string;
  phone?: string;
  rating?: number;
  maps_url: string;
}

export const getNearbyCenters = async (lat: number, lng: number): Promise<ApplicationCenter[]> => {
  try {
    const model = "gemini-2.5-flash";
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: "Find nearby Maha e-Seva Kendra, CSC Centers, and internet cafes where farmers can apply for government schemes." }] }],
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      }
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (!chunks) return [];

    return chunks
      .filter((chunk: any) => chunk.maps?.title && chunk.maps?.uri)
      .map((chunk: any) => ({
        name: chunk.maps.title,
        address: chunk.maps.address || "Nearby location",
        maps_url: chunk.maps.uri,
      }));
  } catch (error) {
    console.error("Error finding nearby centers:", error);
    return [];
  }
};
