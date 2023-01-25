const fs = require("fs");
const inquirer = require("inquirer");

const generateMarkDown = (
    title,
    description,
    contributers,
    tests,
    installation,
    usage,
    licenseBadge,
    licenseText,
    gitUserLink,
    githubRepoLink
) => {
    return `${licenseBadge}
# ${title}

## DESCRIPTION
${description}
## TABLE OF CONTENTS
<details> 
<summary> Table of Contents  </summary>

[DESCRIPTION](${githubRepoLink}#DESCRIPTION)
    
[CONTRIBUTERS](${githubRepoLink}#CONTRIBUERS)
    
[TESTS](${githubRepoLink}#TESTS)
    
[QUESTIONS](${githubRepoLink}#QUESTIONS)
    
[INSTALLATION](${githubRepoLink}#INSTALLATION)
    
[USAGE](${githubRepoLink}#USAGE)
    
[LICENSE](${githubRepoLink}#LICENSE)
</details>    
    
## CONTRIBUTERS
${contributers}
    
## Tests
${tests}
    
## Questions
${gitUserLink}
${githubRepoLink}
    
## INSTALLATION
${installation}
    
## USAGE
${usage}
    
## LICENSE
${licenseText}

    `;
};

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your project name?",
            name: "title",
        },
        {
            type: "input",
            message: "What do you want for your description?",
            name: "description",
        },
        {
            type: "input",
            message: "who contributed to this project?",
            name: "contributers",
        },
        {
            type: "input",
            message: "give an example on how to test your project to show that it is running properly.",
            name: "tests",
        },
        {
            type: "input",
            message: "how would someone install this project?",
            name: "installation",
        },
        {
            type: "input",
            message: "share examples of how to use your project.",
            name: "usage",
        },
        {
            type: "list",
            message: "What license do you want for this project?",
            name: "license",
            choices:["MIT","GPLv2","Apache","GPLv3","Unlicensed"]
        },
        {
            type: "input",
            message: "What year is it? [yyyy]",
            name: "year",
        },
        {
            type: "input",
            message: "What is your name?",
            name: "devName",
        },
        {
            type: "input",
            message: "What is your GitHub account name?",
            name: "gitUser",
        },
        {
            type: "input",
            message: "What is your GitHub repo link?",
            name: "githubRepoLink",
        },
    ])
    .then((response) => {
        const gitUserLink = `https://github.com/${response.gitUser}`

        if (response.license === "MIT"){
            var licenseText = `
            Copyright  ${response.year} ${response.devName}

            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            
            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.` 

            var licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
        } else if (response.license === "GPLv2"){
            var licenseText = `
            Copyright (C) ${response.year} ${response.devName}
            
            This program is free software; you can redistribute it and/or
            modify it under the terms of the GNU General Public License
            as published by the Free Software Foundation; either version 2
            of the License, or (at your option) any later version.
            
            This program is distributed in the hope that it will be useful,
            but WITHOUT ANY WARRANTY; without even the implied warranty of
            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
            GNU General Public License for more details.
            
            You should have received a copy of the GNU General Public License
            along with this program; if not, write to the Free Software
            Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.` 

            var licenseBadge = "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)"

        }else if (response.license === "Apache"){
            var licenseText = `
            Copyright ${response.year} ${response.devName}

            Licensed under the Apache License, Version 2.0 (the "License");
            you may not use this file except in compliance with the License.
            You may obtain a copy of the License at
         
              http://www.apache.org/licenses/LICENSE-2.0
         
            Unless required by applicable law or agreed to in writing, software
            distributed under the License is distributed on an "AS IS" BASIS,
            WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            See the License for the specific language governing permissions and
            limitations under the License.` 

            var licenseBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
        }else if (response.license === "GPLv3"){
            var licenseText = `
            Copyright (C) ${response.year} ${response.devName}
        
            This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
            (at your option) any later version.
        
            This program is distributed in the hope that it will be useful,
            but WITHOUT ANY WARRANTY; without even the implied warranty of
            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
            GNU General Public License for more details.
        
            You should have received a copy of the GNU General Public License
            along with this program.  If not, see <https://www.gnu.org/licenses/>.`
            var licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
        }else{
            var licenseText = `
            This is free and unencumbered software released into the public domain.

            Anyone is free to copy, modify, publish, use, compile, sell, or
            distribute this software, either in source code form or as a compiled
            binary, for any purpose, commercial or non-commercial, and by any
            means.
            
            In jurisdictions that recognize copyright laws, the author or authors
            of this software dedicate any and all copyright interest in the
            software to the public domain. We make this dedication for the benefit
            of the public at large and to the detriment of our heirs and
            successors. We intend this dedication to be an overt act of
            relinquishment in perpetuity of all present and future rights to this
            software under copyright law.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
            IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
            OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
            ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
            OTHER DEALINGS IN THE SOFTWARE.
            
            For more information, please refer to <http://unlicense.org/>`
            var licenseBadge = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
        }
        fs.writeFile(
            "README.md",
            generateMarkDown(
                response.title,
                response.description,
                response.contributers,
                response.tests,
                response.installation,
                response.usage,
                licenseBadge,
                licenseText,
                gitUserLink,
                response.githubRepoLink
            ),
            (err) => {
                if (err) {
                    throw err;
                }
            }
        );
    });
