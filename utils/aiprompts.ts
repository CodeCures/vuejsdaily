import type { LevelKey } from "~/types";

const excludeUnwantedValues: string = `do not add any additional text before or after the object. return the object as it is. do not add any markdown sytanx highlighting like ${'```json'}, ${'```js'}, ${'```javascript'} and do not assign the response to a variable`;

export function generateCourseContent() {
    return [
        { role: "system", content: "Generate a beginner-friendly course name for learning Vue.js. Return the response in JSON format with the structure: { courseName: 'namestring', modules: [ { name: 'moduleName', lessons: [ {name: 'lessonName', content: null} ] } ] }" },
        { role: "user", content: "Generate a beginner-friendly course name for learning Vue.js. The course should appeal to individuals with basic knowledge of web development and aim to teach them fundamental Vue.js concepts in an accessible way." },
        { role: "system", content: "Create a structured outline for a beginner-friendly Vue.js course." },
        { role: "user", content: "Create a structured outline for a beginner-friendly Vue.js course. The course should be divided into modules, each covering essential concepts and techniques in Vue.js. Focus on providing clear explanations and practical examples to help learners grasp the material effectively." },
        { role: "system", content: "Develop lessons for each module of a beginner-friendly Vue.js course." },
        { role: "user", content: "Develop lessons for each module of a beginner-friendly Vue.js course. Each lesson should cover a specific topic within Vue.js, starting from the basics and gradually progressing to more advanced concepts. Ensure that the content is easy to understand for individuals with basic web development knowledge and includes hands-on exercises or projects to reinforce learning." }
    ];
}


export function generateCourseNamePrompt(tag: string, level: LevelKey): string {

    const levelPrompt = {
        Beginner: `someone who has does not know anything about ${tag} and just heard about it for the first time`,
        Intermediate: `someone who has does has basic knowledge of ${tag} and and wants to his/her knowlege of ${tag} to intermediate level`,
        Advanced: `someone whe has intermeidate knowledge of ${tag} and now wants to upgrade to advanced knowledge of ${tag}`
    }

    return `I want you to be my course creator. Using the official documentation for ${tag}, as a course creator you have ${levelPrompt[level]}. I want you to create a course name, and modules that will properly explain the ${level} of ${tag} to this learner in such a way that after going through the course, the learner will have the all ${level} knowledge of ${tag}. the course should be modularized but don't add the course lesson names yet. just the course name, description, meta description, meta keywords array and modules array. the modules should array of string containing only the names of the modules. your response should strictly be a javascript object containing (name, description, meta_description, modules). ${excludeUnwantedValues}`
}

export function reqenerateContent(currentValue: string): string {
    return `rewrite ${currentValue} and make it more professional and marketable. return the response as a javascript object with content key, where the content key contains the newly generated value. e.g {content: newValue}. ${excludeUnwantedValues}`
}

export function regenerateMetaKeywords<T>(currentValue: Array<T>): string {
    return `regenerate this meta keywords (${currentValue.join(',')}) and make it more SEO friendly. return the response as a javascript object with content key, where the content key contains the newly generated array value. e.g {content: newArrayValue[]}. ${excludeUnwantedValues}`
}

export function reqenerateContentArray<T>(currentValue: Array<T>): string {
    return `rewrite ${currentValue.join(',')} and make it more learner friendly and marketable. return the response as a javascript object with content key, where the content key contains the newly generated array value. e.g {content: newArrayValue[]}. ${excludeUnwantedValues}`
}

export function moduleContentPrompt(index: number, moduleName: string, courseName: string): string {
    const tailoredTo = index === 0 ? ' tailored towards Introduction' : '';
    return `${moduleName} is a module in ${courseName}. generate module content${tailoredTo} that contains description, meta_description, lessons array keys. the generate content must be a javascript object with the following structure {description: string, meta_description: string, lessons: string[]}. ${excludeUnwantedValues}`
}

export function generateLessonContentPrompt(courseName: string, lessonName: string): string {
    return `you are creating lessons for ${courseName}, generate an indepth lesson content for ${lessonName}. the content generated should be fun to read, engaging and interactive. should content must really teach about everything that has to do with ${lessonName}. the generated content should be in markdown. return only the markdown content generated`;
}

