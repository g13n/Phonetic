/*
    NATO Phonetic Codes
    
    Copyright 2011 Gopal Venkatesan
    All rights reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var phoneticList = {
    nato: {
        a: "Alpha (AL-FAH)",
        b: "Bravo (BRAH-VOH)",
        c: "Charlie (CHAR-LEE)",
        d: "Delta (DELL-TAH)",
        e: "Echo (ECK-OH)",
        f: "Foxtrot (FOKS-TROT)",
        g: "Golf (GOLF)",
        h: "Hotel (HOH-TEL)",
        i: "India (IN-DEE-AH)",
        j: "Juliet (JEW-LEE-ETT)",
        k: "Kilo (KEY-LOH)",
        l: "Lima (LEE-MAH)",
        m: "Mike (MIKE)",
        n: "November (NO-VEM-BER)",
        o: "Oscar (OSS-CAR)",
        p: "Papa (PAH-PAH)",
        q: "Quebec (KEH-BECK)",
        r: "Romeo (ROW-ME-OH)",
        s: "Sierra (SEE-AIR-RAH)",
        t: "Tango (TANG-GO)",
        u: "Uniform (YOU-NEE-FORM)",
        v: "Victor (VIK-TAH)",
        w: "Whiskey (WISS-KEY)",
        x: "X-Ray (ECKS-RAY)",
        y: "Yankee (YAN-KEE)",
        z: "Zulu (ZOO-LOO)",
        1: "One (WON)",
        2: "Two (TOO)",
        3: "Three (TREE)",
        4: "Four (FOW-ER)",
        5: "Five (FIFE)",
        6: "Six (SIX)",
        7: "Seven (SEV-EN)",
        8: "Eight (AIT)",
        9: "Nine (NI-NEH)",
        0: "Zero (ZEE-ROW)"
    },
    lapd: {
        a: "Adam (ADAM)",
        b: "Boy (BOY)",
        c: "Charles (CHARLES)",
        d: "David (DAVID)",
        e: "Edward (ED-WARD)",
        f: "Frank (FRANK)",
        g: "George (GEORGE)",
        h: "Henry (HEN-RY)",
        i: "Ida (I-DAH)",
        j: "John (JOHN)",
        k: "King (KING)",
        l: "Lincoln (LIN-KUN)",
        m: "Mary (MAY-REE)",
        n: "Norah (NO-RAH)",
        o: "Ocean (O-SHAN)",
        p: "Paul (PAOL)",
        q: "Queen (KWEEN)",
        r: "Robert (ROB-ERT)",
        s: "Sam (SAAM)",
        t: "Tom (TOM)",
        u: "Union (YOU-NEE-AN)",
        v: "Victor (VIK-TAH)",
        w: "William (WIL-I-AM)",
        x: "X-Ray (ECKS-RAY)",
        y: "Young (YAN-G)",
        z: "Zebra (ZEE-BRA)",
        1: "One (WON)",
        2: "Two (TOO)",
        3: "Three (TREE)",
        4: "Four (FOW-ER)",
        5: "Five (FIFE)",
        6: "Six (SIX)",
        7: "Seven (SEV-EN)",
        8: "Eight (AIT)",
        9: "Nine (NI-NEH)",
        0: "Zero (ZEE-ROW)"
    }
};

/*
    Called by HTML body element's onload event when the widget is ready to start.
*/
function load() {
    dashcode.setupParts();
    // Default load last saved text or clipboard data in the inputText
}

/*
    Called when the widget has been removed from the Dashboard.
*/
function remove() {
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

/*
    Called when the widget has been hidden.
*/
function hide() {
    // Stop any timers to prevent CPU usage
}

/*
    Called when the widget has been shown.
*/
function show() {
    // Restart any timers that were stopped on hide
}

/*
    Called when the widget has been synchronized with .Mac.
*/
function sync() {
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

/*
    Called when the info button is clicked to show the back of the widget
    
    event: onClick event from the info button
*/
function showBack(event) {
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout("widget.performTransition();", 0);
    }
}

/*
    Called when the done button is clicked from the back of the widget.
    
    event: onClick event from the done button
*/
function showFront(event) {
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout("widget.performTransition();", 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}

/*
    Populate the inputText with the user's login name and submit it.
    
    event: on clicking the "Choose my Login name" button
*/
function fullNameBtnClick(event) {
    var fullName = widget.system("/usr/bin/osascript -e \"long user name of (system info)\"", null).outputString,
        inputText = document.getElementById("inputText");
    
    if (fullName) {
        inputText.value = fullName.trim();
        makePhonetic(inputText.value);
    } else {
        inputText.value = "<Unable to get Full name>";
    }
}

/*
    Populate the phoneticList with the phonetic word for the inputText.
    
    event: on keyup in the "inputText" text field
*/
function inputTextSearch(event) {
    var input = document.getElementById("inputText");
    
    if (input) {
        makePhonetic(input.value);
    } else {
        alert("Unable to get input text");
    }
}

/*
    Show help on What's NATO Phonetic.
    
    event: on click of "What's this?"
*/
function openWhatsThis(event) {
    widget.openURL("http://en.wikipedia.org/wiki/NATO_phonetic_alphabet");
}

/*
    Make NATO Phonetic for the given input text.
*/
function makePhonetic(input) {
    var list  = document.getElementById("phoneticList"),
        phonetic = document.getElementById("phoneticOption"),
        text = [],
        c, i, n, phonetic;

    phonetic = phonetic.value;
    
    // How to handle non-ASCII?
    for (i = 0, n = input.length; i < n; ++i) {
        c = input.charAt(i).toLowerCase();
        if (c in phoneticList[phonetic]) {
            text.push(phoneticList[phonetic][c]);
        } else {
            text.push(c);
        }
    }
    list.object.content.innerText = text.join("\n");
    list.object.refresh();
}

