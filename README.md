# Postfix Evaluator (Spreadsheet)

### Approach

Read CSV file and get te data into a multi-dimensional array. </br>
Each cell represents one postfix expression. Hence, evaluate each expression individually. </br>
For each expression: </br>
Hash expression and check if expression has been already evaluated (expressions with a cell reference will be stored once evaluated)if so return the value, </br>
if not: </br>
Split expression into tokens. </br>
    for each token in the postfix expression: </br>
        if token is an operator: </br>
            operand_2 ← pop from the stack </br>
            operand_1 ← pop from the stack </br>
            result ← evaluate token with operand_1 and operand_2 </br>
            push result back onto the stack </br>
        else if token is an operand: </br>
            push token onto the stack </br>
        else if token is a cell reference: </br>
            if token has been calculated already: </br>
                get it from the cached object and push onto the stack </br>
            else: </br>
                get the corresponding array index of the cell reference </br>
                get the cell value (expression) from the multi-dimensional array </br>
                evaluate expression and push on to the stack </br>
                store evaluated value into calculated tokens </br>
                hash the expression and store along with the evaluated cell value to use in the future </br>
    result ← pop from the stack </br>
Collect all evaluated values into multi-dimensional array and write to a csv file. </br>

**Assumptions : Always CSV file will be uploaded. **

##### Folder structure

<ul>
<li>Node.js Version: 10.15</li>
<li>src - Source folder</li>
<li>test - Test folder</li>
<li>upload - Input Folder</li>
<li>download - Output folder</li>
</ul>


##### How To Run the Programs

Some file has been included inupload folder.

    npm install
    node src/index.js postfix --inputFile="inputFile.csv" --outputFile="outputFile.csv"


##### Run Lint

    npm run lint

##### Run Tests

    npm run test

##### Run Test Coverage
Current test coverage: 81.5%

    npm run coverage

