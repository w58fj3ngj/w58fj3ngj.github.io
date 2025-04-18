const games = [
  {
    name: "Suggestion",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfGL1e7OqLF33SESfHseKldPbCApT5INSAiy2gx7-nUQJaUvQ/viewform",
    image: "textures/icons/suggestion.webp"
  },
  {
    name: "Crazy Cattle 3D",
    url: "games/crazy-cattle-3d/CrazyCattle3D.html",
    image: "textures/games/crazycattle3d.webp"
  },
  {
    name: "Boxing Random",
    url: "games/boxing-random/index.html",
    image: "textures/games/boxingrandom.webp"
  },
  {
    name: "Volley Random",
    url: "games/volley-random/index.html",
    image: "textures/games/volleyrandom.webp"
  },
  {
    name: "Basket Random",
    url: "games/basket-random/index.html",
    image: "textures/games/basketrandom.webp"
  },
  {
    name: "Soccer Random",
    url: "games/soccer-random/index.html",
    image: "textures/games/soccerrandom.webp"
  },
  {
    name: "Block Blast",
    url: "games/blockblast/index.html",
    image: "textures/games/blockblast.webp"
  },
  {
    name: "Sniper Shot",
    url: "games/snipershot/index.html",
    image: "textures/games/snipershot.webp"
  },
  {
    name: "Temple Of Boom",
    url: "games/temple-of-boom/index.html",
    image: "textures/games/templeofboom.webp"
  },
  {
    name: "Eggy Car",
    url: "games/eggycar/index.html",
    image: "textures/games/eggycar.webp"
  },
  {
    name: "Power Badminton",
    url: "games/pbm/index.html",
    image: "textures/games/pbm.webp"
  },
  {
    name: "3D Bowling",
    url: "games/3d-bowling/index.html",
    image: "textures/games/3dbowling.webp"
  },
  {
    name: "Basketball Stars",
    url: "games/basketball-stars/index.html",
    image: "textures/games/basketballstars.webp"
  },
  {
    name: "Tunnel Rush",
    url: "games/tunnel-rush/index.html",
    image: "textures/games/tunnelrush.webp"
  },
  {
    name: "Tunnel Rush 2",
    url: "games/tunnel-rush-2/index.html",
    image: "textures/games/tunnelrush2.webp"
  },
  {
    name: "Earn To Die",
    url: "games/earn-to-die/index.html",
    image: "textures/games/earntodie.webp"
  },
  {
    name: "Moto X3M",
    url: "games/moto-x3m/index.html",
    image: "textures/games/motox3m.webp"
  },
  {
    name: "Moto X3M 2",
    url: "games/moto-x3m-2/index.html",
    image: "textures/games/motox3m2.webp"
  },
  {
    name: "Moto X3M Winter",
    url: "games/moto-x3m-winter/index.html",
    image: "textures/games/motox3mwinter.webp"
  },
  {
    name: "Moto X3M Pool Party",
    url: "games/moto-x3m-pool-party/index.html",
    image: "textures/games/motox3mpoolparty.webp"
  },
  {
    name: "Moto X3M Spookyland",
    url: "games/moto-x3m-spookyland/index.html",
    image: "textures/games/motox3mspookyland.webp"
  },
  {
    name: "Dead Again",
    url: "games/dead-again/index.html",
    image: "textures/games/deadagain.webp"
  },
  {
    name: "Minecraft Classic",
    url: "games/minecraft-classic/index.html",
    image: "textures/games/minecraftclassic.webp"
  },
  {
    name: "Trafficmania",
    url: "games/trafficmania/index.html",
    image: "textures/games/trafficmania.webp"
  },
  {
    name: "Super Mario Bros",
    url: "games/super-mario-bros/index.html",
    image: "textures/games/supermariobros.webp"
  },
  {
    name: "Hide And Smash",
    url: "games/hide-and-smash/index.html",
    image: "textures/games/hideandsmash.webp"
  },
  {
    name: "Temple Run 2",
    url: "games/temple-run-2/index.html",
    image: "textures/games/templerun2.webp"
  },
  {
    name: "Blocky Snakes",
    url: "games/blocky-snakes/index.html",
    image: "textures/games/blockysnakes.webp"
  },
  {
    name: "Wordle+",
    url: "games/wordle-plus/index.html",
    image: "textures/games/wordleplus.webp"
  },
  {
    name: "Skillfite.io",
    url: "games/skillfite-io/index.html",
    image: "textures/games/skillfiteio.webp"
  },
  {
    name: "Leader Strike",
    url: "games/leader-strike/index.html",
    image: "textures/games/leaderstrike.webp"
  },
  {
    name: "Papa's Sushiria",
    url: "games/papas-sushiria/index.html",
    image: "textures/games/papassushiria.webp"
  },
  {
    name: "Papa's Pizzaria",
    url: "games/papas-pizzaria/index.html",
    image: "textures/games/papaspizzaria.webp"
  },
  {
    name: "Papa's Freezeria",
    url: "games/papas-freezeria/index.html",
    image: "textures/games/papasfreezeria.webp"
  },
  {
    name: "Papa's Burgeria",
    url: "games/papas-burgeria/index.html",
    image: "textures/games/papasburgeria.webp"
  },
  {
    name: "Death Run 3D",
    url: "games/death-run-3d/index.html",
    image: "textures/games/deathrun3d.webp"
  },
  {
    name: "Penalty Kick Online",
    url: "games/penalty-kick-online/index.html",
    image: "textures/games/penaltykickonline.webp"
  },
  {
    name: "Just Fall Lol",
    url: "games/just-fall-lol.html",
    image: "textures/games/justfalllol.webp"
  },
  {
    name: "Sling Drift",
    url: "games/sling-drift/index.html",
    image: "textures/games/slingdrift.webp"
  },
  {
    name: "Bottle Flip 3D",
    url: "games/bottle-flip-3d/index.html",
    image: "textures/games/bottleflip3d.webp"
  },
  {
    name: "Uno 4 Colors",
    url: "games/uno-4-colors/index.html",
    image: "textures/games/uno4colors.webp"
  },
  {
    name: "The Impossible Quiz",
    url: "games/the-impossible-quiz/index.html",
    image: "textures/games/theimpossiblequiz.webp"
  },
  {
    name: "Push The Box",
    url: "games/push-the-box/index.html",
    image: "textures/games/pushthebox.webp"
  },
  {
    name: "Slope 2 Player",
    url: "games/slope-2-player/index.html",
    image: "textures/games/slope2player.webp"
  },
  {
    name: "Gunspin",
    url: "games/gunspin/index.html",
    image: "textures/games/gunspin.webp"
  },
  {
    name: "Idle Tree City",
    url: "games/idle-tree-city/index.html",
    image: "textures/games/idletreecity.webp"
  },
  {
    name: "Masked Forces",
    url: "games/maskedforces/index.html",
    image: "textures/games/maskedforces.webp"
  },
  {
    name: "Jetpack Joyride",
    url: "games/jetpackjoyride/index.html",
    image: "textures/games/jetpackjoyride.webp"
  },
  {
    name: "Stack",
    url: "games/stack/index.html",
    image: "textures/games/stack.webp"
  },
  {
    name: "Candy Jump",
    url: "games/candyjump/index.html",
    image: "textures/games/candyjump.webp"
  },
  {
    name: "8 Ball Pool",
    url: "games/8ballpool/index.html",
    image: "textures/games/8ballpool.webp"
  },
  {
    name: "Golf Champions",
    url: "games/golfchampions/index.html",
    image: "textures/games/golfchampions.webp"
  },
  {
    name: "Jungle Tower Defense",
    url: "games/jungletowerdefense/index.html",
    image: "textures/games/jungletowerdefense.webp"
  },
  {
    name: "Slope",
    url: "games/slope/index.html",
    image: "textures/games/slope.webp"
  },
  {
    name: "Stickman Hook",
    url: "games/stickman-hook/index.html",
    image: "textures/games/stickmanhook.webp"
  },
  {
    name: "Drive Mad",
    url: "games/drive-mad/index.html",
    image: "textures/games/drivemad.webp"
  },
  {
    name: "Monster Tracks",
    url: "games/monstertracks/index.html",
    image: "textures/games/monstertracks.webp"
  },
  {
    name: "Sausage Flip",
    url: "games/sausageflip/index.html",
    image: "textures/games/sausageflip.webp"
  },
  {
    name: "Down The Hill",
    url: "games/downthehill/index.html",
    image: "textures/games/downthehill.webp"
  },
  {
    name: "Grindcraft",
    url: "games/grindcraft/index.html",
    image: "textures/games/grindcraft.webp"
  },
  {
    name: "Fruit Merge",
    url: "games/fruitmerge/index.html",
    image: "textures/games/fruitmerge.webp"
  },
  {
    name: "Super Mario 64",
    url: "games/super-mario-64/index.html",
    image: "textures/games/supermario64.webp"
  },
  {
    name: "Eaglercraft 1.5.2",
    url: "games/eaglercraft/index.html",
    image: "textures/games/eaglercraft.webp"
  },
  {
    name: "Bacon May Die",
    url: "games/baconmaydie/index.html",
    image: "textures/games/baconmaydie.webp"
  },
  {
  name: "President Simulator",
  image: "textures/games/presidentsimulator.webp",
  url: "games/presidentsimulator/index.html"
},
{
  name: "Stickman Ragdoll",
  image: "textures/games/stickmanragdoll.webp",
  url: "games/stickmanragdoll/index.html"
},
{
  name: "Elastic Man",
  image: "textures/games/elasticman.webp",
  url: "games/elasticman/index.html"
},
{
  name: "Gunspin",
  image: "textures/games/gunspin.webp",
  url: "games/gunspin/index.html"
},
{
  name: "1v1.lol",
  image: "textures/games/1v1lol.webp",
  url: "games/1v1-lol/index.html"
},
{
  name: "2048",
  image: "textures/games/2048.webp",
  url: "games/2048/index.html"
},
{
  name: "The Impossible Quiz 2",
  image: "textures/games/tiq2.webp",
  url: "games/tiq2/index.html"
},
{
  name: "Traffic Rush",
  image: "textures/games/trafficrush.webp",
  url: "games/traffic-rush/index.html"
},
{
  name: "Awesome Tanks 2",
  image: "textures/games/awesometanks2.webp",
  url: "games/awesome-tanks-2/index.html"
},
{
  name: "Bloxorz",
  image: "textures/games/bloxorz.webp",
  url: "games/bloxorz/index.html"
},
{
  name: "Idle Ants",
  image: "textures/games/idleants.webp",
  url: "games/idle-ants/index.html"
},
{
  name: "Bitlife",
  image: "textures/games/bitlife.webp",
  url: "games/bit-life/index.html"
},
{
  name: "Baldis Basics",
  image: "textures/games/baldisbasics.webp",
  url: "games/baldis-basics/index.html"
},
{
  name: "Cookie Clicker",
  image: "textures/games/cookieclicker.webp",
  url: "games/cookie-clicker/index.html"
},
{
  name: "Crossy Road",
  image: "textures/games/crossyroad.webp",
  url: "games/crossy-road/index.html"
},
{
  name: "Drift Boss",
  image: "textures/games/driftboss.webp",
  url: "games/drift-boss/index.html"
},
{
  name: "Monkey Mart",
  image: "textures/games/monkeymart.webp",
  url: "games/monkey-mart/index.html"
},
{
  name: "Drift Hunters",
  image: "textures/games/drifthunters.webp",
  url: "games/drift-hunters/index.html"
},
{
  name: "Idle Breakout",
  image: "textures/games/idlebreakout.webp",
  url: "games/idle-breakout/index.html"
},
{
  name: "Snow Rider 3D",
  image: "textures/games/snowrider3d.webp",
  url: "games/snow-rider-3d/index.html"
},
{
  name: "Retro Bowl",
  image: "textures/games/retrobowl.webp",
  url: "games/retro-bowl/index.html"
},
{
  name: "Subway Surfers",
  image: "textures/games/subwaysurfers.webp",
  url: "games/subway-surfers/index.html"
},
{
  name: "Shell Shockers",
  image: "textures/games/shellshockers.webp",
  url: "games/shell-shockers/index.html"
},
{
  name: "Tomb of the Mask",
  image: "textures/games/tombofthemask.webp",
  url: "games/tomb-of-the-mask/index.html"
},
{
  name: "Time Shooter 3",
  image: "textures/games/timeshooter3.webp",
  url: "games/time-shooter-3/index.html"
},
{
  name: "Learn to Fly",
  image: "textures/games/learntofly.webp",
  url: "games/learn-to-fly-1/index.html"
},
{
  name: "Johnny Upgrade",
  image: "textures/games/johnnyupgrade.webp",
  url: "games/johnnyupgrade/index.html"
},
{
  name: "Tiny Fishing",
  image: "textures/games/tinyfishing.webp",
  url: "games/tiny-fishing/index.html"
},
{
  name: "Chrome Dino",
  image: "textures/games/chromedino.webp",
  url: "games/chrome-dino/index.html"
},
{
  name: "Clicker Heroes",
  image: "textures/games/clickerheros.webp",
  url: "games/clicker-heros/index.html"
},
{
  name: "Duck Life",
  image: "textures/games/ducklife1.webp",
  url: "games/duck-life-1/index.html"
},
{
  name: "Duck Life 2",
  image: "textures/games/ducklife2.webp",
  url: "games/duck-life-2/index.html"
},
{
  name: "Duck Life 3",
  image: "textures/games/ducklife3.webp",
  url: "games/duck-life-3/index.html"
},
{
  name: "Duck Life 4",
  image: "textures/games/ducklife4.webp",
  url: "games/duck-life-4/index.html"
},
{
  name: "Conway's Game of Life",
  image: "textures/games/conwaysgameoflife.webp",
  url: "games/conways-game-of-life/index.html"
},
{
  name: "Doge Miner",
  image: "textures/games/dogeminer.webp",
  url: "games/doge-miner/index.html"
},
{
  name: "Rooftop Snipers",
  image: "textures/games/rooftopsnipers.webp",
  url: "games/rooftop-snipers/index.html"
},
{
  name: "Cubes 2048",
  image: "textures/games/cubes2048.webp",
  url: "games/cubes-2048/index.html"
},
{
  name: "Tube Clicker",
  image: "textures/games/tubeclicker.webp",
  url: "games/tube-clicker/index.html"
},
{
  name: "Paper.io 2",
  image: "textures/games/paperio2.webp",
  url: "games/paperio2/index.html"
},
{
  name: "Crazy Cars",
  image: "textures/games/crazycars.webp",
  url: "games/crazy-cars/index.html"
},
{
  name: "Bad Ice-Cream",
  image: "textures/games/badicecream.webp",
  url: "games/bad-icecream/index.html"
}
];
