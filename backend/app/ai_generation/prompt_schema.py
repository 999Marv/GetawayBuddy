def schema(prompt):
    """
    This is a schema function that sets up instruction for the ai.
    We essentially want the ai to return an itinerary based off of user's, DAYS, TYPE OF ACTIVITY, and LOCATION.
    """
    return [
        {"role": "system", "content": "You are a helpful travel agent helping a customer book their dream vacation."},
        {"role": "user", "content": f"To your best ability, generate a {prompt['days']} day itinerary, including Morning, Afternoon, and Nighttime activities to do in {prompt['country']}. These activities should ONLY be {prompt['type_of_activity']} types of activities. Keep activities to 2 sentences make it clear and add relevant emojis sometimes. Always respond strictly in JSON format with double-quoted keys and values, for example: {{\"day1\": \"morning: 'activity', afternoon: 'activity', nighttime: 'activity'\"}}. Do not include any extra text outside the JSON."}
    ]
