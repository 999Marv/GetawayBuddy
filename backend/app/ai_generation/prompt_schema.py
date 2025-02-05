def schema(prompt):
    """
    This is a schema function that sets up instruction for the ai.
    We essentially want the ai to return an itinerary based off of user's, DAYS, TYPE OF ACTIVITY, and LOCATION.
    """
    return [
        {"role": "system", "content": "You are a helpful travel agent helping a customer book their dream vacation."},
        {"role": "user", "content": (
            f"To your best ability, generate a {prompt['days']} day itinerary for {prompt['country']}, including Morning, Afternoon, and Nighttime activities. "
            f"These activities should ONLY be {prompt['type_of_activity']} types of activities. Keep each activity with 50 words max, be clear, and add relevant emojis sometimes. "
            "Return a single JSON object with two keys: 'activities' and 'description'. 'activities' should be an object where each key is a day (e.g., 'day1') and its value is an object with keys 'morning', 'afternoon', and 'nighttime'. "
            "The 'description' should be a string with two sentences describing the current state of affairs of that country and any travel recommendations. "
            "Do not include any extra text outside of the JSON."
        )}
    ]
