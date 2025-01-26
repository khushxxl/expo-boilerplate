import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./utils";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function signInWithSupabase(form: {
  email: string;
  password: string;
}) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function signUpWithSupabase(form: {
  email: string;
  password: string;
  username: string;
}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export const getAuthenticatedUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    console.error("No authenticated user found");
    return;
  }
  console.log("Authenticated user:", session.user);

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", session.user.email)
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return;
  }

  return userData || { error: "No User Found" };
};

export const signoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export async function addDataToSupabase(tableName: string, data: any) {
  try {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data)
      .select();

    if (error) {
      throw error;
    }

    return insertedData;
  } catch (error) {
    console.error(`Error adding data to ${tableName}:`, error);
    throw error;
  }
}

export async function deleteDataFromSupabase(
  tableName: string,
  condition: { column: string; value: any }
) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq(condition.column, condition.value);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error deleting data from ${tableName}:`, error);
    throw error;
  }
}

export async function updateDataInSupabase(
  tableName: string,
  id: number,
  data: any
) {
  try {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data)
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    return updatedData;
  } catch (error) {
    console.error(`Error updating data in ${tableName}:`, error);
    throw error;
  }
}

export async function updateDataInSupabaseByColumn(
  tableName: string,
  columnName: string,
  value: any,
  data: any
) {
  try {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data)
      .eq(columnName, value)
      .select();

    if (error) {
      throw error;
    }

    return updatedData;
  } catch (error) {
    console.error(`Error updating data in ${tableName}:`, error);
    throw error;
  }
}

export async function getDataFromSupabase(
  tableName: string,
  column: string,
  value: any
) {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq(column, value);
  if (error) {
    console.error(`Error getting data from ${tableName}:`, error);
    throw error;
  }
  return data;
}

export const getUserTripsFromSupabase = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_plans")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error getting user trips:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error getting user trips:", error);
    throw error;
  }
};
