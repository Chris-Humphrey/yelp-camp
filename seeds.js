var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Yellowstone",
        image: "https://c1.staticflickr.com/4/3876/14863812502_aa42b7bab2_c.jpg",
        description: "Yellowstone National Park is an American national park located in Wyoming, Montana, and Idaho. It was established by the U.S. Congress and signed into law by President Ulysses S. Grant on March 1, 1872.[4][5] Yellowstone was the first national park in the U.S. and is also widely held to be the first national park in the world.[6] The park is known for its wildlife and its many geothermal features, especially Old Faithful geyser, one of its most popular features.[7] It has many types of ecosystems, but the subalpine forest is the most abundant. It is part of the South Central Rockies forests ecoregion."
    },
    {
        name: "Big Bend",
        image: "https://c1.staticflickr.com/9/8209/8206763160_e9910e9029_c.jpg",
        description: "Big Bend National Park is an American national park located in West Texas, bordering Mexico. The park has national significance as the largest protected area of Chihuahuan Desert topography and ecology in the United States. The park protects more than 1,200 species of plants, more than 450 species of birds, 56 species of reptiles, and 75 species of mammals."
    },
    {
        name: "Yosemite",
        image: "https://c2.staticflickr.com/4/3252/2676378920_32113f8565_z.jpg?zz=1",
        description: "Yosemite National Park (/joʊˈsɛmɪti/, yoh-SEM-i-tee)[4] is an American national park located in the western Sierra Nevada of Central California,[5][6] bounded on the southeast by Sierra National Forest and on the northwest by Stanislaus National Forest. The park, which is managed by the National Park Service, covers an area of 747,956 acres (1,168.681 sq mi; 302,687 ha; 3,026.87 km2)[2] and sits in four counties: centered in Tuolumne and Mariposa, extending north and east to Mono and south to Madera County."
    }
];


function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
}

module.exports = seedDB;