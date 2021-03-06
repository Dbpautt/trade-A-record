'use strict';

const records = [{
  owner: ['Diana'],
  name: 'Legend',
  isActive: true,
  artist: 'Bob Marley',
  coverImageURL: 'https://www.elclubdelrockandroll.com/uploads/7/6/7/9/76793449/s132834213532544176_p1823_i1_w440.jpeg',
  description: 'A greatest hits collection of singles in its original vinyl format and is the best-selling reggae album of all-time',
  genre: 'Alternative',
  releaseYear: 1984,
  condition: 'Scratched',
  snippet: 'https://open.spotify.com/embed/album/0tiPal8J7t3B9tPF7kGWDi'
},
{
  owner: ['Jonathan'],
  name: 'The times they are a-changin’',
  isActive: true,
  artist: 'Bob Dylan',
  coverImageURL: 'https://i.pinimg.com/originals/75/74/55/757455cfd4c0e9b6ff54e99c7ce582b4.jpg',
  description: 'Come gather around people Wherever you roam and admit that the waters around you have grown',
  genre: 'Rock',
  releaseYear: 1964,
  condition: 'Good',
  snippet: 'https://open.spotify.com/embed/album/7DZeLXvr9eTVpyI1OlqtcS'
},
{
  owner: ['Jonathan'],
  name: 'Help!',
  isActive: true,
  artist: 'The Beatles',
  coverImageURL: 'http://1.bp.blogspot.com/-l6t_-SYA8k8/VJVxtyxIEuI/AAAAAAAAPFU/KnR4WhjUns4/s1600/help_LP_cover.jpg',
  description: 'Produced by George Martin, this was the fifth UK album release by the band, and contains fourteen songs in its original British form',
  genre: 'Pop',
  releaseYear: 1965,
  condition: 'As new',
  snippet: 'https://open.spotify.com/embed/album/0PT5m6hwPRrpBwIHVnvbFX'
},
{
  owner: ['Diana'],
  name: 'G.I. Blues',
  isActive: true,
  artist: 'Elvis',
  coverImageURL: 'http://static.flickr.com/31/49567889_48b7a4ba44.jpg',
  description: 'G.I. Blues is a 1960 American musical comedy film directed by Norman Taurog and starring Elvis Presley, Juliet Prowse, and Robert Ivers',
  genre: 'Alternative',
  releaseYear: 1960,
  condition: 'Used',
  snippet: 'https://open.spotify.com/embed/user/jons01/playlist/5sKNE5TAZE5iyuhfB63HaI'
},
{
  owner: ['Diana'],
  name: 'Justice',
  isActive: true,
  artist: 'Justice',
  coverImageURL: 'https://i.pinimg.com/originals/8a/4a/43/8a4a43ec0a71c1125ee4a46d67bc32c1.jpg',
  description: 'These guys are just so cool',
  genre: 'Alternative',
  releaseYear: '2007',
  condition: 'As new',
  snippet: 'https://open.spotify.com/embed/album/4GGazqHvuKwxBjWLFaJkDL'
},
{
  owner: ['Diana'],
  name: 'Nevermind',
  isActive: true,
  artist: 'Nirvana',
  coverImageURL: 'https://www.fiftiesstore.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/b/e/bert_e71073_xxl.jpg',
  description: 'Twenty-seven years after its release, Nirvana\'s Nevermind remains one of the most exhilarating and pivotal albums of all time.',
  genre: 'Alternative',
  releaseYear: 1991,
  condition: 'Good',
  snippet: 'https://open.spotify.com/embed/album/2guirTSEqLizK7j9i1MTTZ'
},
{
  owner: ['Diana'],
  name: 'Free the Universe',
  isActive: true,
  artist: 'Major Lazer',
  coverImageURL: 'https://is5-ssl.mzstatic.com/image/thumb/Music/v4/2a/23/00/2a230004-37f2-4f96-7e3a-33078afc7541/656605029276.jpg/1200x630bb.jpg',
  description: 'Diplo has risen through the ranks and asserted himself as one of the most pioneering producers of the time.',
  genre: 'Alternative',
  releaseYear: 2012,
  condition: 'As new',
  snippet: 'https://open.spotify.com/embed/album/6Ax8Neb7dEif3KUlJwj2P8'
},
{
  owner: ['Diana'],
  name: 'Dr Doom',
  isActive: true,
  artist: 'Kool Keith',
  coverImageURL: 'https://img.discogs.com/HjHrXZejK8rDj2hV5n3PErreZVs=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-140518-1449607945-2777.jpeg.jpg',
  description: 'Dr Octagon!',
  genre: 'Hip-hop',
  releaseYear: 1999,
  condition: 'Good',
  snippet: 'https://open.spotify.com/embed/album/45Ls3xyYRSUIzZms4jH4BI'
},
{
  owner: ['Diana'],
  name: 'Sex Style',
  isActive: true,
  artist: 'Kool Keith',
  coverImageURL: 'http://cdn.shopify.com/s/files/1/0993/9646/products/KTR006CD.jpeg?v=1466276875',
  description: 'More of the good stuff from Dr Octagon',
  genre: 'Hip-hop',
  releaseYear: 1999,
  condition: 'Scratched',
  snippet: 'https://open.spotify.com/embed/album/24tZC54R5v3rg7PDETTLub'
},
{
  owner: ['Diana'],
  name: 'Reign In Blood',
  isActive: true,
  artist: 'Slayer',
  coverImageURL: 'https://najlepszamuzyka.pl/17483-large_default/slayer-reign-in-blood-1-lp-180-gram-pressing-wydanie-amerykanskie.jpg',
  description: 'The 1986 headbanger released on Def Jam. reign in Blood.',
  genre: 'Alternative',
  releaseYear: 1986,
  condition: 'As new',
  snippet: 'https://open.spotify.com/embed/album/2DumvqHl78bNXuvU9kQfPN'
},
{
  owner: ['Barbara'],
  name: 'Uncanny Valley',
  isActive: true,
  artist: 'Midnight Juggernauts',
  coverImageURL: 'https://is5-ssl.mzstatic.com/image/thumb/Music2/v4/31/d4/7a/31d47a6f-4817-9ce6-b244-d60cef14b53b/cover.jpg/268x0w.jpg',
  description: 'This is an original bought in Australia in 2013, with signatures.',
  genre: 'Alternative',
  releaseYear: 2013,
  condition: 'Scratched',
  snippet: 'https://open.spotify.com/embed/album/4VLB8R3dOvJ2NzsfR5E2Nt'
},
{
  owner: ['Barbara'],
  name: 'Adolescents',
  isActive: true,
  artist: 'Adolescents',
  coverImageURL: 'http://www.amiright.com/album-covers/images/album_The-Adolescents-The-Adolescents.jpg',
  description: 'Awesome album that includes the songs I hate kids and Amoeba.',
  genre: 'Punk',
  releaseYear: 1981,
  condition: 'Good',
  snippet: 'https://open.spotify.com/embed/artist/2sSmGd0x45FGBtjJwNBSFr'
},
{
  owner: ['Barbara'],
  name: 'Daft Punk',
  isActive: true,
  artist: 'Random Access Memories',
  coverImageURL: 'http://static.daftpunk-anthology.com/wp-content/uploads/2013/06/RAM-unofficial-remixes_cover-dpa1.jpg',
  description: 'An amazing mix of disco, soft rock, and prog-pop, along with some Broadway-style pop bombast and even a few pinches of their squelching stadium-dance aesthetic.',
  genre: 'Alternative',
  releaseYear: 2013,
  condition: 'As new',
  snippet: 'https://open.spotify.com/embed/album/4m2880jivSbbyEGAKfITCa'
}];

module.exports = records;
