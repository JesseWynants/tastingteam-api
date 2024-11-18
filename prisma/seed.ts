import { PrismaClient, WineType } from '@prisma/client'
import * as Airtable from 'airtable';
import type { FieldSet } from 'airtable'
import moment from 'moment';
import { R2Client } from '../lib/R2';
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base("appxu5yX91R3Qqpq8");
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';
const roundsOfHashing = 10;


//@todo: rerun this for new tasting
//@todo: update this so we calculate the score of the wine on each score crud operation and save it to the wine (better for performance)
interface Wijn extends FieldSet {
    Name: string;
    Nummer: number;
    Vintage: number;
    Druif: string;
    Promotor: string;
    'Promotor Intro': string;
    Label: any;
    Prijs: number;
    'Waar verkrijgbaar?': string;
    Visible: boolean;
    Country: string;
    type: string;
    'Tasting Editie': number;
    Scores: any;
}
interface Tasting extends FieldSet {
    Editie: number;
    Datum: any;
    Bij:string;
    Thema: string;
    Teams: any;
    Leden: any;
}
interface Lid extends FieldSet{
    Email: string;
    Name: string;
}
interface ATScore extends FieldSet{
    Wie: string,
    'Score (op 5)': number;
    Notitie: string;
    'Kelder?': boolean;
}
interface Team extends FieldSet{
    Name: string;
}
async function getUserId(airtable_id: string){
        //find user_id
        let airtable_user_email:string = (await base.table<Lid>('Leden').find(airtable_id)).fields.Email;
        let user = await prisma.user.findUnique({
            where: { email: airtable_user_email },
            select: {id: true}
        });
        if(user){
            return user.id;
        }else{
            return '0'
        }
}
function mapTypetoEnum (type:string | undefined){
   if (!type) return WineType.RED; // Default value, adjust as needed
   switch (type){
        case "Wit":
            return WineType.WHITE;
        case "Rood":
           return WineType.RED;
        case "Rosé":
           return WineType.ROSE;
        case "Mousserend":
            return WineType.SPARKLING;
        default:
           return WineType.RED; // Default value, adjust as needed
   }
}
async function main() {
    //await seedCountries();
    await seedUsers();
    //await seedTeams();
    //await seedGrapes();
    //await seedTastings();
    //await seedWines();
}
async function seedCountries(){
    let countries = await base.table('Countries').select().all();
    for (const country of countries) {
        console.log(`Upsert the country: ${country.fields.Name}`);
        // Upload flag image to Cloudflare R2 if it exists
        let flagUrl = '';
        if (Array.isArray(country.fields.Flag) && country.fields.Flag[0]) {
            try {
                const r2Client = new R2Client(  // Removed 'await' here - R2Client constructor is not async
                    process.env.R2_ENDPOINT!,
                    process.env.R2_ACCESS_KEY!,
                    process.env.R2_SECRET_KEY!, 
                    process.env.R2_BUCKET_NAME!
                );
                
                // Get the actual file URL from Airtable
                const attachment = country.fields.Flag[0];
                const response = await fetch(attachment.url, {
                    headers: {
                        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.statusText}`);
                }

                const buffer = await response.arrayBuffer();
                const extension = attachment.type.split('/').pop()?.toLowerCase() || 'png';
                const filename = `flags/${(String(country.fields.Name) || 'unknown').toLowerCase().replace(/\s+/g, '-')}.${extension}`;
                
                // Make sure uploadBuffer is properly awaited and returns a string
                flagUrl = await r2Client.uploadBuffer(buffer, filename, attachment.type);
                console.log(`Successfully uploaded flag for ${country.fields.Name}, URL: ${flagUrl}`);
            } catch (error) {
                console.error(`Failed to upload flag for ${country.fields.Name}:`, error);
                continue;
            }
        }
        console.log(`flagurl: ${flagUrl}`);
        let db_country = await prisma.country.upsert({
            where: { name: String(country.fields.Name) },
            create: {
                name: String(country.fields.Name),
                Flag: flagUrl,
                Region: String(country.fields.Region),
            },
            update: {
                name: String(country.fields.Name),
                Flag: flagUrl,
                Region: String(country.fields.Region),
            }
        });
    }
}


async function seedUsers(){
    let users = await base.table<Lid>('Leden').select().all();
    for (const user of users) {
        console.log(`Upsert the user: ${user.fields.Email}`);
        let db_user = await prisma.user.upsert({
            where: { email: user.fields.Email },
            create: {
                email: user.fields.Email,
                name: user.fields.Name,
                password: await bcrypt.hash(user.fields.Email, roundsOfHashing),
            },
            update: {
                email: user.fields.Email,
                name: user.fields.Name,
                password: await bcrypt.hash(user.fields.Email, roundsOfHashing),
            }
        });
    }
}
async function seedTeams(){
    let teams = await base.table('Teams').select().all();
    for (const team of teams) {
        console.log(`Upsert the team: ${team.fields.Name}`);
        const teamMembers = await Promise.all(
            ((team.fields.Leden as string[]) || []).map(async (member: string) => ({
                id: await getUserId(member)
            }))
        );
        let db_team = await prisma.team.upsert({
            where: { name: String(team.fields.Name) },
            create: {
                name: String(team.fields.Name),
                users: {
                    connect: teamMembers
                }
            },
            update: {
                name: String(team.fields.Name),
                users: {
                    connect: teamMembers
                }
            }
        });
    }
}
async function seedGrapes(){
    let grapes = await base.table('Druiven').select().all();
    for (const grape of grapes) {
        console.log(`Upsert the grape: ${grape.fields.Name}`);
        let db_grape = await prisma.grape.upsert({
            where: { name: String(grape.fields.Name) },
            create: {
                name: String(grape.fields.Name),
                type: mapTypetoEnum(String(grape.fields.Type)),
            },
            update: {
                name: String(grape.fields.Name),
                type: mapTypetoEnum(String(grape.fields.Type)),
            }
        });
    }
}
async function seedTastings(){
    let tastings = await base.table<Tasting>('Tastings').select().all();
    for (const tasting of tastings) {
        const participants = await Promise.all(
            tasting.fields.Leden.map(async (participant: string) => ({
                id: await getUserId(participant)
            }))
        );
        
        console.log(`Upsert the tasting: ${tasting.fields.Name}`);
        let db_tasting = await prisma.tasting.upsert({
            where: { id: tasting.fields.Editie },
            create: {
                id: tasting.fields.Editie,
                time: moment(tasting.fields.Datum).toDate(),
                location: tasting.fields.Bij,
                teamId: 1,
                theme: tasting.fields.Thema,
                participants: {
                    connect: participants
                }
            },
            update: {
                id: tasting.fields.Editie,
                time: moment(tasting.fields.Datum).toDate(),
                location: tasting.fields.Bij,
                teamId: 1,
                theme: tasting.fields.Thema,
            }
        });
    }
}
async function seedWines(){
    let wijnen = await base.table<Wijn>('Wijnen').select().all();
    console.log(`Total number of wines found ${wijnen.length}`);
    for(const wijn of wijnen) {

        console.log(`Upsert the wine: ${wijn.fields.Name}`);
        const tastingId = Array.isArray(wijn.fields['Tasting Editie']) 
            ? wijn.fields['Tasting Editie'][0] 
            : wijn.fields['Tasting Editie'];

        const grapeConnections = wijn.fields.Druif
            ? (await Promise.all((Array.isArray(wijn.fields.Druif) ? wijn.fields.Druif : [wijn.fields.Druif]).map(async (grapeId: string) => {
                const grape = await base.table('Druiven').find(grapeId);
                if (!grape) {
                    console.log(`Could not find grape with ID ${grapeId}`);
                    return null;
                }
                const dbGrape = await prisma.grape.findUnique({
                    where: { name: String(grape.fields.Name) }
                });
                if (!dbGrape) {
                    console.log(`Could not find grape ${grape.fields.Name} in database`);
                    return null;
                }
                return { id: dbGrape.id };
            }))).filter((connection): connection is { id: number } => connection !== null)
            : [];
        const countryId = await (wijn.fields.Country 
        ? (async () => {
            const country = await base.table('Countries').find(String(wijn.fields.Country));
            if (!country) {
                console.log(`Could not find country with ID ${wijn.fields.Country}`);
                return null;
            }
            const dbCountry = await prisma.country.findUnique({
                where: { name: String(country.fields.Name) }
            });
            if (!dbCountry) {
                console.log(`Could not find country ${country.fields.Country} in database`);
                return null;
            }
            return dbCountry.id;
        })()
        : null);

        let label = undefined;

        if (wijn.fields.Label) {
            const originalUrl = wijn.fields.Label[0].url;
            const response = await fetch(originalUrl);
            const buffer = await response.arrayBuffer();
            
            // Create a sanitized filename from the wine name
            const sanitizedName = wijn.fields.Name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const uniqueFilename = `wines/${wijn.id}_${sanitizedName}.jpg`;
            
            try {
                const r2Client = new R2Client(
                    process.env.R2_ENDPOINT!,
                    process.env.R2_ACCESS_KEY!,
                    process.env.R2_SECRET_KEY!,
                    process.env.R2_BUCKET_NAME!
                );
                
                label = await r2Client.uploadBuffer(buffer, uniqueFilename, 'image/jpeg');
                console.log(`Uploaded wine label to R2: ${label}`);
            } catch (error) {
                console.error(`Failed to upload wine label to R2:`, error);
                label = originalUrl;
            }
        }

        let db_wine = await prisma.wine.upsert({
            where: { name: wijn.fields.Name },
            create: {
                name: wijn.fields.Name,
                number: Number(wijn.fields.Nummer),
                vintage: wijn.fields.Vintage || null,
                grapes: {
                    connect: grapeConnections
                },
                countryId: countryId,
                user_description: wijn.fields['Promotor Intro'] || undefined,
                price: wijn.fields.Prijs || null,
                where_to_buy: wijn.fields['Waar verkrijgbaar?'] || undefined,
                userId: await getUserId(wijn.fields.Promotor),
                publishedAt: wijn.fields.Visible ? (wijn.fields.created ? new Date(String(wijn.fields.created)) : null) : null,
                label: label,
                wine_type: mapTypetoEnum(wijn.fields.type),
                tastings: {
                    connect: { id: tastingId }
                }
            },
            update: {
                name: wijn.fields.Name,
                number: Number(wijn.fields.Nummer),
                vintage: wijn.fields.Vintage || null,
                grapes: {
                    connect: grapeConnections
                },
                countryId: countryId,
                user_description: wijn.fields['Promotor Intro'] || undefined,
                price: wijn.fields.Prijs || null,
                where_to_buy: wijn.fields['Waar verkrijgbaar?'] || undefined,
                userId: await getUserId(wijn.fields.Promotor),
                publishedAt: wijn.fields.Visible ? (wijn.fields.created ? new Date(String(wijn.fields.created)) : null) : null,
                label: label,
                wine_type: mapTypetoEnum(wijn.fields.type),
                tastings: {
                    connect: { id: tastingId }
                }
            },
        });
        if (!wijn.fields.Scores) continue;
        console.log(`creating scores for wine`);
        for (const score of wijn.fields.Scores) {
            let at_score = (await base.table<ATScore>('Scores').find(score)).fields;
            console.log(`creating score for wine`);
            
            if (typeof at_score['Score (op 5)'] !== 'number') {
                console.log(`Skipping score creation - invalid score value for wine ${db_wine.id}`);
                continue;
            }

            await prisma.score.upsert({
                where: {userId_wineId: {userId: await getUserId(at_score.Wie[0]), wineId: db_wine.id}},
                create: {
                    userId: await getUserId(at_score.Wie[0]),
                    wineId: db_wine.id,
                    score: at_score['Score (op 5)'],
                    note: at_score.Notitie,
                    kelder: at_score['Kelder?'] || false
                },
                update: {
                    score: at_score['Score (op 5)'],
                    note: at_score.Notitie,
                    kelder: at_score['Kelder?'] || false
                }
            })
        }
    }
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })