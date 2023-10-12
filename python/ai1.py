import sys
from BaseAI import BaseAI

class AI1(BaseAI):
    def get_response(self, message):
        # Logic for generating AI1's response
        return f"AI1: I received the message '{message}'."

if __name__ == "__main__":
    user_message = sys.argv[1]
    
    ai1 = AI1(
        model='gpt-4',
        temperature=0.2,
        max_tokens=1000,
        frequency_penalty=0.0
    )
    print(ai1.get_ai_response(user_message))
