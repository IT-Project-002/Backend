# Project Construct
    - Use Flask web framework python based
    - use jinja2 web template engine python based
       - fixed name of static and template directory
       - css files stay in static directory whereas html files stay in templates file
# User Direction
## Set up
    - use python 3 or latest as the interpreter
    - run command 'python3 -m venv env'        :: create a new virtual environment
    - run command 'source env/bin/activate'    :: activate the new environment
    - run command 'pip install Flask'          :: install Flask package ('F' CAPITAL)

## Resolve case: Port already been used
    - run command 'lsof -i:5000'               :: generate a table with PID
    - run command 'kill -9 <PID>'              :: terminate selected app

## Before Merge to the main branch
    check list
        - ensure your branch is ahead of the main branch
        - ensure squash your commit, make the git history clean
