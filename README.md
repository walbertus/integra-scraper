# Integra ITS scraper

### What for?
You can use this script to get any courses you want during Integra war faster than anyone

### Prerequisite
 * Install NodeJs
 * Git clone or download this repository
 * Run `npm install` in this repository folder

### How to use?
There are some things to do before you can use this script
 1. Login to your integra account and access **SIAKAD**
 2. Get your **cookie** from browser you use to login
 3. Fill `config.json` in `user` with your NRP and cookie
 4. Fill courses you want to take
   Format: `course_code:class:curriculum_year:department_code`
   Explanation:
   course_code = IF4101 (Dasar Pemrograman)
   class = A (`_` for course with one class only)
   curriculum_year = 2018 (current curriculum year)
   department_code = 51100 (informatics)
   (Confuse? You can inspect integra form in courses dropdown)
 5. run `npm start`


 ### Disclaimer
 Use it at your own risk


 Made by [William AD](https://www.linkedin.com/in/walbertus)
 