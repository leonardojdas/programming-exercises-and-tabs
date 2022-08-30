window.onload=function() {
    callTabs();
    callExercises();
};

// load tabs
function callTabs()
{
    // get all tabs divs
    let tabs = document.querySelectorAll("div.tab");

    // select the first tab
    document.querySelector("#"+tabs[0].id).classList.add("tab-selected");

    // show the div of the first output
    document.querySelector("#"+tabs[0].attributes.value.value).classList.add("show-input");

    // load all eventlistener toggling between tabs when clicked
    tabs.forEach(tabEl => {
        document.querySelector("#"+tabEl.id).addEventListener("click", e => {
            
            // input container
            tabs.forEach(inputEl => {
                //
                document.querySelector("#"+inputEl.id).classList.remove("tab-selected");

                // hide all input div
                document.querySelector("#"+inputEl.attributes.value.value).classList.remove("show-input");
                
                // clean the container output
                document.querySelector("#output-container").innerHTML = "";

                // clean all entries before moving to another tab
                clearEntries(inputEl.attributes.value.value);

                // show the input div related to the clicked tab
                if(tabEl === inputEl)
                {
                    document.querySelector("#"+inputEl.id).classList.add("tab-selected");
                    document.querySelector("#"+inputEl.attributes.value.value).classList.add("show-input");
                }
            });
        });
    });
}

// load all addEventListener
function callExercises()
{
    document.querySelector("#btnExercise1").addEventListener("click", e => 
        exercise1(document.querySelector("#inputQ1min").value, document.querySelector("#inputQ1max").value));

    document.querySelector("#btnExercise2").addEventListener("click", e => 
        exercise2(document.querySelector("#inputQ2").value));
    
    document.querySelector("#btnExercise3").addEventListener("click", e => 
        exercise3(document.querySelector("#inputQ3nums").value, document.querySelector("#inputQ3key").value));

    document.querySelector("#btnExercise4").addEventListener("click", e => 
        exercise4(document.querySelector("#inputQ4").value));

    document.querySelector("#btnExercise5").addEventListener("click", e => 
        exercise5(document.querySelector("#inputQ5numStars").value, document.querySelector("#inputQ5max").value));

    document.querySelector("#btnExercise6").addEventListener("click", e => 
        exercise6(document.querySelector("#inputQ6").value, document.querySelector("#inputQ6").value));

    document.querySelector("#btnExercise7").addEventListener("click", e => 
        exercise7(document.querySelector("#inputQ7").value));

    document.querySelector("#btnExercise8").addEventListener("click", e => 
        exercise8(document.querySelector("#inputQ8").value));

    document.querySelector("#btnExercise9").addEventListener("click", e => 
        exercise9(document.querySelector("#inputQ9").value));

    document.querySelector("#btnExercise10").addEventListener("click", e => 
        exercise10(document.querySelector("#inputQ10angleA").value, document.querySelector("#inputQ10angleB").value, document.querySelector("#inputQ10angleC").value));
}

/* ---------- auxiliary functions ---------- */

/* isValidNumber
 * Send: number
 * Return: boolean true if is a number and false if is not
 * Verify whether the entry is a number or not */
function isValidNumber(n)
{
    let r = false;
    if(!isNaN(n) && (n === "" ? false : true))
        r = true;

    return r;
}

/* isVowel
 * Send: string
 * Return: boolean true if is a vowel and false if is not
 * Verify whether the letter is a vowel or not */
function isVowel(letter)
{
    switch(letter.toLowerCase()){
        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
            return true;
            break;
        deafult:
            return false;
    }
}

/* isBinary
 * Send: number
 * Return: boolean true if is a binary and false if is not
 * Verify whether the number is a binary or not */
function isBinary(number)
{
    let indexStart = 0;
    let indexEnd = 1;

    // this function does not work with fraction
    if(number.search(".") === -1)
        return false;
    else
    {
        while(indexEnd <= number.length)
        {
            //console.log(number.length);
            if (Number(number.substring(indexStart, indexEnd)) !== 1 &&
                Number(number.substring(indexStart, indexEnd)) !== 0)
                return false;
    
            indexStart++;
            indexEnd++;
        }
    }

    return true;
}

/* isValidAngleRange
 * Send: number
 * Return: boolean true if the number is within range and false if is not
 * Verify whether the number is within the range or not */
function isValidAngleRange(number)
{
    let min = 0;
    let max = 180;
    let r = false;

    if(Number(number) > min && Number(number) < max)
        r = true;
    
    return r;
}

/* clearEntries
 * Send: ID of the input element
 * Return: nothing
 * Clean all entries before moving to another tab */
function clearEntries(inputId)
{
    let arrInputs = document.querySelectorAll("#"+inputId+" input");
    arrInputs.forEach(e => {
        document.querySelector("#"+e.id).value = "";
    });
}

/* ---------- main functions ---------- */

/* exercise1
 * Send: Two numbers
 * Return: nothing
 * Ask the user for two integers and display all the integers */
function exercise1(min, max)
{
    if(isValidNumber(min) && isValidNumber(max))
    {
        if(Number(min) > Number(max))
            document.querySelector("#output-container").innerHTML = "Bad entry - Minimum > Maximum.";
        else
        {
            let output = `<ul>`;
            for(let i = Number(min); i <= Number(max); i++)
                output += `<li>${i}</li>`;

            output += `</ul>`;
            
            document.querySelector("#output-container").innerHTML = output;
        }
    }
}

/* exercise2
 * Send: A comma-seprated numeric value
 * Return: nothing
 * Show the quantity, total, average, smallest and largest */
function exercise2(num)
{
    let isNum = true;
    let arrNum = num.split(",").map((n) => {
        return (isValidNumber(n) ? Number(n) : isNum = false);
    });

    if(isNum)
    {
        let nValues = arrNum.length;
        let total = 0;
        let smallest = arrNum[0];
        let largest = 0;

        arrNum.forEach(e => {
            total += e;
            e < smallest ? smallest = e : 0;
            e > largest ? largest = e : 0;
        });

        let output = `<ul>`;
        output += `<li>Number of values: ${nValues}</li>`;
        output += `<li>Total: ${total}</li>`;
        output += `<li>Average: ${total/nValues}</li>`;
        output += `<li>Smallest: ${smallest}</li>`;
        output += `<li>Largest: ${largest}</li>`;
        output += `</ul>`;

        document.querySelector("#output-container").innerHTML = output;
    }
    else
        document.querySelector("#output-container").innerHTML = "The entry does not correspond to a numeric value.";
}

/* exercise3
 * Send: Two numbers
 * Return: nothing
 * Display the number of times */
function exercise3(nums, key)
{
    let isNum = true;
    let arrNum = nums.split(",").map((n) => {
        return (isValidNumber(n) ? Number(n) : isNum = false);
    });

    if(isNum && isValidNumber(key))
    {
        let count = 0;

        arrNum.forEach(e => {
            Number(key) === Number(e) ? count++ : 0;
        });

        document.querySelector("#output-container").innerHTML = count;
    }
    else
        document.querySelector("#output-container").innerHTML = "The entry does not correspond to a numeric value.";
}

/* exercise4
 * Send: A number
 * Return: nothing
 * Display the * character */
function exercise4(numStars)
{
    if(isValidNumber(numStars))
    {
        if(Number(numStars) < 1)
            document.querySelector("#output-container").innerHTML = "The entry must be greater than 0.";
        else
        {
            let output = "";
            // console.log(Number(numStars).length);
            for(let i = 0; i < Number(numStars); i++)
                output += "*";
    
            document.querySelector("#output-container").innerHTML = output;
        }
    }
}

/* exercise5
 * Send: Two numbers
 * Return: nothing
 * Display the * character breaking the line */
function exercise5(numStars, max)
{
    if(isValidNumber(numStars) && isValidNumber(max))
    {
        if(Number(numStars) < 1 || Number(max) < 1)
            document.querySelector("#output-container").innerHTML = "The entry must be greater than 0.";
        else
        {
            let output = "";
            let count = 1;
            for(let i = 0; i < Number(numStars); i++)
            {
                output += "*";
                if(count === Number(max))
                {
                    output += "<br>";
                    count = 1;
                }
                else
                    count++;
            }
            document.querySelector("#output-container").innerHTML = output;
        }
    }
}

/* exercise6
 * Send: A string
 * Return: nothing
 * Replace all vowels within a string */
function exercise6(string)
{
    let indexStart = 0;
    let indexEnd = 1;
    let count = 0;
    let newString = "";

    while(indexEnd <= string.length)
    {
        if(isVowel(string.substring(indexStart,indexEnd)))
        {
            newString += "*";
            count++;
        }
        else
            newString += string.substring(indexStart,indexEnd);
            
        indexStart++;
        indexEnd++;
    }

    newString = `<ul><li>${count}</li><li>${newString}</li></ul>`;

    document.querySelector("#output-container").innerHTML = newString;
}

/* exercise7
 * Send: A number
 * Return: nothing
 * Calculate the shipping costs */
function exercise7(items)
{
    if(isValidNumber(items) && (items > 0))
    {
        let tax = 0;

        if(Number(items) < 100)
            tax = 5;
        else if((Number(items) >= 100) && (Number(items) <= 1000))
            tax = 4;
        else
            tax = 3;
    
        let baseCost = Number(items)*tax;
        let output = `<ul>`;
        output += `<li>Base Cost: ${baseCost}</li>`;
        output += `<li>Tax: ${(baseCost)*0.15}</li>`;
        output += `<li>Total: ${((baseCost)*0.15)+(baseCost)}</li>`;
        output += `</ul>`;
    
        document.querySelector("#output-container").innerHTML = output;
    }
    else
        document.querySelector("#output-container").innerHTML = "The entry must be greater than 0.";
}

/* exercise8
 * Send: A number
 * Return: nothing
 * Calculate the number of boxes, singles and costs of a bars */
function exercise8(number)
{
    if(isValidNumber(number) && (number > 0))
    {
        let singleCost = 1.75;
        let boxCost = 32;

        let boxQtd = 24;

        let numberOfBoxes = Math.floor(Number(number) / boxQtd);
        let numberOfSingles = Number(number) - (numberOfBoxes * boxQtd);
        let costOfBox = numberOfBoxes * boxCost;
        let costOfSingle = numberOfSingles * singleCost;

        let output = `<ul>`;
        output += `<li>Number of Boxes: ${numberOfBoxes}</li>`;
        output += `<li>Number of Singles: ${numberOfSingles}</li>`;
        output += `<li>Cost of Boxes: ${costOfBox}</li>`;
        output += `<li>Cost of Singles: ${costOfSingle}</li>`;
        output += `<li>Total Cost: ${costOfBox + costOfSingle}</li>`;
        output += `</ul>`;
    
        document.querySelector("#output-container").innerHTML = output;
    }
    else
        document.querySelector("#output-container").innerHTML = "The entry must be greater than 0.";
}

/* exercise9
 * Send: A string representing a binary number
 * Return: nothing
 * Convert from base 2 to base 10 */
function exercise9(number)
{
    if(!isBinary(number))
        document.querySelector("#output-container").innerHTML = "The string entered does not represent a binary number.";
    else
    {
        let indexStart = 0;
        let indexEnd = 1;
        let power = number.length-1;
        let outputA = "";
        let outputB = "";
        let total = 0;

        while(indexEnd <= number.length)
        {
            if(Number(number.substring(indexStart,indexEnd)) === 1)
            {
                outputA += `2<span class='superscript'>${power}</span>${(indexEnd !== number.length ? ` + ` : ``)}`;
                outputB += `${Math.pow(2,power)}${(indexEnd !== number.length ? ` + ` : ``)}`;
                total += Math.pow(2,power);
            }
            
            power--;
            indexStart++;
            indexEnd++;
        }
        
        document.querySelector("#output-container").innerHTML = outputA + " = " + outputB + " = " + total;
    }
}

/* exercise10
 * Send: Three numbers
 * Return: nothing
 * Verify if the triangle is right, obtuse or acute */
function exercise10(a, b, c)
{
    // check if the input contain just numbers
    if(isValidNumber(a) && isValidNumber(b) && isValidNumber(c))
    {
        let sumAngles = Number(a) + Number(b) + Number(c);
        
        // if any angle is less than or equal to 0
        // or if any angle is greater than or equal to 180
        // or if the sum of the three angles is not 180
        if(!isValidAngleRange(a) || !isValidAngleRange(b) || !isValidAngleRange(c) || (sumAngles !== 180))
            document.querySelector("#output-container").innerHTML = "One or more entries do not correspond to the criteria.";
        else
            // any of the angles is 90
            if(Number(a) === 90 || Number(b) === 90 || Number(c) === 90)
                document.querySelector("#output-container").innerHTML = "Right Triangle.";
            // any of the angles is greater than 90
            else if(Number(a) > 90 || Number(b) > 90 || Number(c) > 90)
                document.querySelector("#output-container").innerHTML = "Obtuse Triangle.";
            //all of the angles are less than 90
            else
                document.querySelector("#output-container").innerHTML = "Acute Triangle.";
    }
}