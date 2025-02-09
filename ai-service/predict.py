import subprocess
import sys
import os

# Get the file path passed as a command-line argument
file_path = sys.argv[1]

# Normalize path format (for Windows, convert to a format compatible with curl)
file_path = os.path.normpath(file_path)

# Run the curl command with the file argument
subprocess.run(["curl", "-X", "POST", "http://localhost:8000/predict", "-F", f"file=@{file_path}"])