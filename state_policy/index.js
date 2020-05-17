// import axios from "axios";
import React from "react";
import Helmet from "react-helmet";
import L from "leaflet";
import current from "./current.json";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";

const LOCATION = {
  lat: 37.0902,
  lng: -95.7129,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 5;

const unitedStates = [
  {
    name: "Alabama",
    status: "Open with Restrictions",
    restrictions:
      "Theaters, casinos, bowling alleys and night clubs closed. Non-work gatherings of any size will be allowed, as long as people maintain 6 feet of distancing. Beaches are open with restrictions.",
  },
  {
    name: "Alaska",
    status: "Open with Restrictions",
    restrictions:
      "Personal services businesses and restaurants in most parts of Alaska open but with a 50% capacity limit. Bars and gyms at 25%. Religious gatherings will be allowed, but with a limit of 50 people. The state rules say anyone who sings should be 10 feet away from the nearest person.",
  },
  {
    name: "Arizona",
    status: "Open with Restrictions",
    restrictions:
      "Arizona allowed retail stores to do in-person business again from May 8 with strict physical distancing. From May 11 Arizona restaurants were able to offer dine-in services again. The governor said the state is working with the industry to come up with specific distancing rules for restaurants later in the week. Navajo Nation extended the closure of its government until May 17.",
  },
  {
    name: "Arkansas",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Asa Hutchinson said April 30 that gyms, fitness centers, and indoor athletic facilities could resume operations beginning May 4; barbershops and hair salons from May 6. The state allowed restaurants to open for limited dine-in service May 11. Restaurants will be able to operate at a third of their normal capacity and they must limit groups to no larger than 10 people. Hutchinson added that if the state continues to see a downward trend of coronavirus cases, it will move into a second phase by allowing restaurants to increase to 67% of capacity.",
  },
  {
    name: "California",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Gavin Newsom issued a stay-at-home order on March 19 that has no set end date. The state also began allowing scheduled surgeries. Newsom emphasized the surgeries being phased back in are important medical procedures like heart surgery or removing cancerous tumors that should not be neglected. Elective procedures like cosmetic surgery are still not a priority. However, California is pulling back on issuing permits for events and activities, including protests, at all state facilities, according to the California Highway Patrol. Newsom said May 1 that he is 'days, not weeks' away from beginning to lift some restrictions in the state's stay-at-home order. On May 4 the state announced some retailers -- clothing stores, florists, and bookshops — will be allowed to reopen with curbside pickup and physical distancing. Associated manufacturing and supply chain for those retail businesses will also be able to get back to work.The latest county to announce beach openings came May 11. Los Angeles County said beaches could open May 13 for running, swimming and surfing but not sunbathing or picnicking.",
  },
  {
    name: "Colorado",
    status: "Open with Restrictions",
    restrictions:
      "The state’s “safer-at-home” order took effect April 27 and is in effect until May 27. Retail businesses can reopen with curbside delivery and elective medical procedures can resume. Businesses such as personal training and dog grooming can reopen with social distancing. Retail businesses began to reopen May 1, while people were permitted to return to non-essential office work May 4. On May 11, Gov. Jared Polis said state park campsites would be available for rental beginning May 12. A decision on restaurant reopenings will happen May 25, the governor said.",
  },
  {
    name: "Connecticut",
    status: "Closed",
    restrictions:
      "On April 30, Lamont outlined the industries that officials in the state are looking at for re-opening on May 20. So far the list includes outdoor-only restaurants (no bar areas), outdoor zoos and outdoor museums, university research programs, hair and nail services, remaining retail that's currently been deemed as non-essential, some offices -- although individuals should be encouraged to work from home where possible.",
  },
  {
    name: "Delaware",
    status: "Closed",
    restrictions:
      "Gov. John Carney issued a statewide stay-at-home order that will remain until May 15 or until the 'public health threat is eliminated.' Carney said the state will consider reopening its economy only after seeing 28 days of declining Covid-19 cases. 'By the end of the week, I think we'll have a comprehensive testing plan that will require more than double the number of tests that we have now,' Carney said on April 29. Delaware has joined a coalition with the Northeastern states of New York, New Jersey, Connecticut, Massachusetts, Pennsylvania and Rhode Island to coordinate the reopening of the economy, according to a press release from New York Gov. Andrew Cuomo's office. The governor said April 17 that once the state reopens, social distancing, face coverings in public, washing hands, limited gatherings and vulnerable populations sheltering in place will remain.",
  },
  {
    name: "District of Columbia",
    status: "Closed",
    restrictions:
      "Washington, DC, Mayor Muriel E. Bowser extended a stay-at-home order until May 15. 'I don't know if that means we will be open on May 16, but it will be a point for us to check in. And if we need to extend it beyond that, we certainly will,' Bowser said during an April 15 media briefing.",
  },
  {
    name: "Florida",
    status: "Open with Restrictions",
    restrictions:
      "Florida reopened certain businesses through much of the state on May 4 except in the counties of Broward, Miami-Dade and Palm Beach. Starting May 4, restaurants are allowed to offer outdoor seating with six-foot space between tables and indoor seating at 25% capacity. Retail can operate at 25% of indoor capacity, and bars, gyms and personal services such as hairdressers will remain closed. Churches remain on 'voluntary social distancing,' and movie theaters remain closed. The state's stay-at-home order ended on April 30. Gov. Ron DeSantis defended the decision made by local leaders to reopen the beaches as he awaits recommendations from the Re-Open Florida Task Force. The reopening of the beaches in Jacksonville Beach, Florida, generated criticism and also generated the Twitter hashtag #FloridaMorons. 'My hat's off to the people of Jacksonville and northeast Florida for doing a great job,' DeSantis said. 'And for those who try to say you're morons, I would take you over the folks who are criticizing you any day of the week and twice on Sunday. 'The Florida Keys will not reopen to visitors until at least June, county commissioners said April 24.",
  },
  {
    name: "Georgia",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Brian Kemp started to ease restrictions April 24. Gyms, fitness centers, bowling alleys, body art studios, barbers, hair and nail salons, estheticians and massage therapists were able to reopen April 24, with certain rules. Theaters and restaurants were allowed to reopen April 27, also with caveats. The caveats include social distancing and screening employees for illness. Bars, nightclubs and music venues will remain closed, for now. A shelter-in-place order for "medically fragile and elderly Georgians" is in place through June 12. The shelter-in-place order for other Georgians ended April 30. "However, moving forward, I am urging Georgians to continue to stay home whenever possible," Kemp said in a statement. "I want to thank the people of our great state who heeded public health advice, afforded us time to bolster our health-care infrastructure, and flattened the curve. We were successful in these efforts, but the fight is far from over."',
  },
  {
    name: "Hawaii",
    status: "Open with Restrictions",
    restrictions:
      'Gov. David Ige on May 5 announced a plan to ease the stay-at-home restrictions in place, calling it a "safer-at-home" plan. On May 7, in the first phase of the plan, a number of businesses were allowed to open, including shopping malls, car washes, pet grooming, elective surgery, nonprofit organizations, and in-person retail businesses as long as social distancing is maintained. Beaches are now open for exercising such as jogging, running or walking and on May 13 the governor said that recreational activities can take place on some beaches starting May 15. People in Kauai to return to the beaches as long as they are in groups of no more than 10 people from the same household. The state is continuing to discourage visitors to the islands for now, as anyone arriving from out of state must immediately quarantine for 14 days. Groups of two people or more are now allowed to fish for subsistence or commercial purposes, Ige said earlier. A previous restriction limited such gatherings to two people.',
  },
  {
    name: "Idaho",
    status: "Open with Restrictions",
    restrictions:
      'After Gov. Brad Little\'s "Order to Self-Isolate" expired on May 1, Idaho\'s entered the first stage of the state\'s recovery plan. Bars, gyms and theaters must remain closed and restaurants can continue carryout service, but some other businesses and places of worship could open with social distancing plans. Little said that the measures were working and Idaho is "truly seeing a flattening of the curve." Under the second phase, restaurant dining and salons would be permitted to open, although gatherings would still be limited to fewer than 10 people.',
  },
  {
    name: "Illinois",
    status: "Open with Restrictions",
    restrictions:
      'Gov. J.B. Pritzker issued a modified stay-at-home order that went into effect on May 1 and extends through the end of the month. The order allows more flexibility "where it is safe" to do so, according to Pritzker. This new order allows residents to leave their home for essential activities, including for health and safety, for necessary supplies and services, for outdoor activity, for certain types of work, to take care of others, and to engage in the free exercise of religion. "All we were trying to do was to make more explicit that people do have the right to gather in a group of 10 or less," he said. "As long as you are social distancing. " State parks, golf courses, retail stores, and garden centers are some of the few places that are reopening with strict social measures. Non-urgent surgeries that have been put off due to the crisis can also now be scheduled in surgery centers and hospitals, according to the governor. Pritzker also announced guidance on the use of masks in public. He said, "Tomorrow will be the first day where adults and any children over the age of two and everyone medically able to tolerate a face covering will be required to wear one in public places where they can\'t maintain a 6-foot social distance. " On May 5, the governor also announced a five-phase reopening plan. Pritzker said that Phase 3 -- when manufacturing, offices, retail, barbershops and salons can reopen, with restrictions -- won’t begin until May 29 at the earliest.',
  },
  {
    name: "Indiana",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Eric Holcomb's stay-at-home order expired May 1 and the state is currently in Stage 1 of the its reopening plan. Critical businesses have opened but all other industries are closed. Stage 2, which rolled out for most of the state on May 4, eases restrictions on essential travel, permits social gatherings of up to 25 people and reopens state government offices with limited public interaction. Retail and commercial businesses can open at 50% capacity, as can shopping malls, though indoor common areas are restricted to 25% capacity. Restaurants and bars that serve food can open starting May 11 at 50% capacity, and personal services such as hair salons, barbershops, nail salons and tattoo parlors can open at that time by appointment only. Indiana is part of a Midwest coalition of states looking at reopening possibilities.",
  },
  {
    name: "Iowa",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Kim Reynolds has not declared a stay-at-home order. Reynolds allowed 77 of Iowa\'s 99 counties to reopen restaurants, fitness centers, retail stores and enclosed malls at 50% capacity beginning May 1. Reynolds also lifted the ban on religious gatherings of more than 10 people. This is "a targeted approach to loosening restrictions" and focuses on counties "where there is no virus activity or where virus activity has been consistently low and shown a downward trend," said Reynolds. Counties where Covid-19 activity is higher will have their closures extended through May 15, the governor said. "It\'s based on a stabilization and it\'s based on virus activity and the amount of new cases over the past 14 days," Reynolds said. "Businesses and churches approved for reopening must also adhere to social distancing, hygiene, public health measures, and business guidelines from the department of public health to, of course, reduce the risk of transmission of Covid-19," the governor said. Reynolds also said that restaurants will have to keep tables at least six feet apart and limit the number of people that can be at a table. The governor emphasized that the state limit on social gatherings of more than 10 people remains in place.',
  },
  {
    name: "Kansas",
    status: "Open with Restrictions",
    restrictions:
      "The state’s stay-at-home order ended May 4. Gov. Laura Kelly said resaturants can open if they adhere to proper public health guidelines and can maintain at least 6 feet between customers. Libraries and child care facilities also may open. Bars, nightclubs, casinos, gyms, and personal service businesses where close contact cannot be avoided must remain closed. On May 6, Kelly signed a proclamation that allowed dental services to resume statewide in compliance with special guidelines adopted by the Iowa Dental Board. Also, campgrounds, drive-in movie theaters, tanning facilities and medical spas may partially reopen following guidelines and taking public health measures. Fitness centers, malls and other retail establishments in the 22 counties that did not ease restrictions May 1 may also reopen at 50% capacity.",
  },
  {
    name: "Kentucky",
    status: "Open with Restrictions",
    restrictions:
      "After issuing a “healthy at home” order in March, the state rolled out the following plan to reopen certain businesses and services. In all cases, reopened businesses are told to follow certain rules. — May 11: These sectors were allowed to reopen: manufacturing, construction, vehicle or vessel dealerships; professional services at 50% capacity; horse racing without fans; and dog grooming and boarding will be allowed to reopen, according to Gov. Andy Beshear. — May 20: Retail and houses of worship will be allowed to reopen. — May 22: Restaurants can reopen at 33% capacity, and with outdoor seating. — May 25: Barber shops, salons and cosmetology businesses may reopen. Also, 10-person social gatherings will be allowed again. — June 1: Movie theaters and fitness centers can reopen. — June 11: Campgrounds can reopen. — June 15: Childcare services may resume, with reduced capacity. Later, perhaps in July, the state could allow bars to reopen, as well has gatherings up to 50 people, Beshear said. Customers and employees will be asked to wear a mask at every reopened and essential business. Kentucky began a second phase of reopening healthcare on May 6, according to Health Commissioner Dr. Steven Stack. Outpatient gastrointestinal procedures, radiology procedures (invasive and non-invasive), diagnostic non-urgent cardiac procedures, outpatient orthopedic procedures, outpatient ophthalmological procedures, outpatient ENT procedures, and outpatient dental procedures are now allowed, Stack said.",
  },
  {
    name: "Louisiana",
    status: "Closed",
    restrictions:
      "Gov. John Bel Edwards said May 11 the stay-at-home order, set to expire May 15, will not be extended. Under the new order, malls in Louisiana will remain closed to the public, but stores can offer curbside delivery. Restaurants can still do takeout and delivery orders but can also offer outdoor seating. There will not be any wait staff, but customers will be able to sit outside and eat if they want, minding social distancing rules. Edwards also said that all employees in businesses interacting with the public are required to wear masks. Churches can operate outdoors with tents as long as those tents don't have flaps on the side, the governor said. Businesses that were previously directed to close will remain closed, including salons, barbershops, bars and casinos. Edwards said his decision to extend the order was based on data, science and the guidance from the White House. Edwards said the state has not met the threshold where they need to be in hospitalizations, new cases and testing.",
  },
  {
    name: "Maine",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Janet Mills announced that while the state has started to flatten the curve, it is still not out of the woods. She extended the state's stay-at-home order through May 31, allowing some businesses to reopen on May 1. These include barber shops and hair salons, auto dealerships and drive-in, stay-in-your-vehicle religious services but the businesses must comply with strict health and safety protocols. Residents must wear cloth masks in public places where physical distancing is difficult to maintain.",
  },
  {
    name: "Maryland",
    status: "Open with Restrictions",
    restrictions:
      "The state’s stay-at-home order ends May 15 and will be replaced by a new health advisory. Gov. Larry Hogan said May 13 that retail stores may open with 50% capacity, manufacturing operations may resume, barber shops and hair salons may open with 50% capacity by appointment only and churches can begin to hold religious services again either outside or indoors with 50% capacity. Hogan advised proper precautions, such as masks and social distancing, must still be practiced. The governor had announced May 6 that elective medical procedures could resume at the discretion of local hospitals and healthcare providers. From May 9 the state allowed more outdoor activities, such as walking, hiking, running, or biking, golf, tennis, boating, fishing, and camping. Closed state parks and state beaches can reopen for people who are exercising, Hogan added.",
  },
  {
    name: "Massachusetts",
    status: "Closed",
    restrictions:
      'Gov. Charlie Baker announced that he is extending the timeline for the closure of nonessential businesses. "We are extending the timeline for all nonessential businesses to keep the physical workplaces and facilities closed to all workers, customers and the public until May 18 and the state-at-home advisory also remains in place during this time," Baker said, adding that gatherings of 10 or more are also banned until May 18. Massachusetts has joined a coalition with the Northeastern states of New York, New Jersey, Connecticut, Pennsylvania, Delaware, and Rhode Island to coordinate the reopening of the economy, according to a press release from New York Gov. Andrew Cuomo\'s office.',
  },
  {
    name: "Michigan",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Gretchen Whitmer on May 7 said the state's stay-at-home order has been extended through May 28. The order allowed manufacturing workers to resume work May 11. The big three auto suppliers, in agreement with United Auto Workers (UAW) union, will begin phasing into work on May 18, the governor said, where they’ll be starting at 25% capacity before phasing up. In an April 24 order, Whitmer relaxed restrictions so some businesses can reopen and the public can participate in more outdoor activities like golf and motorized boating. That order allowed landscapers, lawn-service companies, plant nurseries and bike repair shops to resume operating, subject to social-distancing rules. Big-box retailers will no longer have to close off garden centers and areas dedicated to selling paint and carpet. People also are allowed to travel between their residences, though it isn't encouraged. They will be allowed to use motorized boats and play golf in adherence with social distancing protocols. State parks, which have been accessible during the health emergency, will remain open. On May 11, Whitmer said the state might take a regional approach to reopening.",
  },
  {
    name: "Minnesota",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Tim Walz extended the state's stay at home order until May 18. Retail stores may reopen then if they have safety plans and can operate at no more than 50% capacity. The governor said when the stay at home order ends, it will be replaced with an order that allows people to gather with friends and family of groups of less than 10.",
  },
  { name: "Mississippi", status: "Closed", restrictions: "Essentials only" },
  {
    name: "Missouri",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Mike Parson on April 16 extended the stay-at-home order through May 3. Parson announced his Show Me Strong Recovery plan on April 27, under which the state started reopening economic and social activity on May 4. There are no limitations on social gatherings as long as six feet of distance can be maintained between individuals. All business will be able to reopen as long as six feet of social distancing can be maintained. Indoor retail businesses will also have to limit their number of customers to no more than 25% of normal capacity. Local communities will be allowed to have stricter rules if they choose.",
  },
  {
    name: "Montana",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Steve Bullock has announced a gradual and phased reopening of the state beginning April 26 for individuals and extending to businesses April 27. Main street and retail businesses can become operational if they adhere to requirements to limit capacity and maintain strict physical distancing. Restaurants, bars, breweries, and distilleries are allowed to provide some in-establishment services beginning May 4. Businesses where groups gather without the ability to social distance including movie theaters, gyms and other places of assembly will remain closed. Montana's travel quarantine will remain in effect, and out of state travelers and residents arriving from another state or country back to Montana for non-work-related purposes are required to quarantine for 14 days.",
  },
  {
    name: "Nebraska",
    status: "Open with Restrictions",
    restrictions:
      "Restaurants are permitted to allow customers inside but must permit no more than 50% of their normal capacity. Salons, massage businesses and tattoo parlors will be limited to 10 people at a time, with everyone wearing face coverings. Houses of worship will be able to meet in-person, but with 6 feet of separation. Gov. Pete Ricketts said youth baseball and softball teams can begin practice under new guidelines starting June 1, with games slated to resume June 18.",
  },
  {
    name: "Nevada",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Steve Sisolak said May 7 that the state\'s stay-at-home order would end in two days rather than May 15. "I’m able to move up this announcement because, as a state, we have met our gateway benchmarks for starting reopening," Sisolak said. Starting May 9, restaurants were allowed to open for dine-in services with social distancing, and customers waiting for a table will stay outside. Most retail establishments can open, including hair salons, by reservation only. Retail businesses are limited to 50% of normal capacity. Sisolak made it clear that casinos will stay closed until the Gaming Control Board determines they can safely open. Additionally, bars, bowling alleys, movie theaters and tattoo parlors are among the other businesses that will have to remain closed.',
  },
  {
    name: "New Hampshire",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Chris Sununu issued a modified stay-at-home order, called "Stay at Home 2.0" which is in effect until May 31. The governor said the state is looking to reopen based on facts, science and data. Sununu did clarify that the stay-at-home order is still in place. "You are healthier at home, we want you to stay at home," he said. Elective surgeries can resume on May 4 if they are time sensitive. On May 11, barbers and hair salons were allowed to reopen as long as customers have reservations and there are no more than 10 people in the salon, including staff. Customers and employees must wear face masks. Retail shops also opened on May 11 to customers but will be limited to 50% occupancy and employees must wear face masks. Restaurants will reopen on May 18, but only with outdoor seating options. Tables must be 6 feet apart, only six people can be seated at a table and servers must have cloth face coverings.',
  },
  {
    name: "New Jersey",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Phil Murphy issued a stay-at-home order on March 21 that has no specific end date. State parks, golf courses and county parks reopened May 2. On April 27, Murphy announced a “Road Back” plan, which did not name dates for when other restrictions would be lifted, but instead laid out six principles or metrics that would guide when the easing will happen. They included 14-days of declining new Covid-19 cases and hospitalizations, and expanding the state’s capacity to test for the disease. Reopening will likely begin in workplaces and venues where the state has a "high degree of confidence" that social distancing and other related norms can be effectively executed, Murphy said then. On May 6, Murphy said he was extending a public health emergency declaration for 30 days. This does not alter the state’s stay-at-home order or “Road Back” plan, but rather allows Murphy to use state resources as necessary to combat the spread of coronavirus, he said. “If it signals one thing, it is this: We can’t give up one bit on the one thing we know that is working in this fight -- social distancing,” Murphy said. New Jersey is a part of a coalition with the Northeastern states of New York, Connecticut, Pennsylvania, Delaware, Rhode Island and Massachusetts that said they would aim to coordinate the reopening of the economy, according to a news release from New York Gov. Andrew Cuomo\'s office.',
  },
  {
    name: "New Mexico",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Michelle Lujan Grisham and health officials extended the state's stay-at-home order to May 31. Grisham is allowing most businesses in the state to reopen starting May 16, but only at 25% capacity. The order does not include salons, gyms, malls and dine-in service at restaurants. It also does not apply to three counties in the northwestern part of the state that are considered hotspots for coronavirus. The revised order requires people to wear face coverings beginning May 16. On April 30, she eased restrictions on some businesses. Non-essential retail stores are being allowed to offer curbside pickup. Veterinarians can open, as can pet adoption places, groomers, daycare and boarding businesses. Golf courses can allow people to play.",
  },
  {
    name: "New York",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Andrew Cuomo said May 11 that there are three regions in the state – Finger Lakes, Southern Tier, and Mohawk Valley -- that meet the metrics required to reopen May 15. "Some regions are ready to go today, they just need to get some logistical pieces in order by the end of the week. Some places are very close … just one or two criteria that haven’t been met yet," he said. He reiterated that the reopening of businesses would be phased, starting with construction, manufacturing, retail (curbside pickup), agriculture, forestry and fishing. Phase two would use more of a business-by-business analysis using a matrix that determines each businesses overall importance and risk in reopening. Cuomo has said the state would leave 2 weeks between phases so it can monitor the effects of what it has done. Two weeks is the incubation period of the virus, per experts.',
  },
  {
    name: "North Carolina",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Roy Cooper extended a stay-at-home order through May 8. Cooper said beginning May 8: Retail stores can expand capacity to 50%. Child care facilities can open for children of working parents or those looking for work. Gatherings of up to 10 people will be allowed outdoors. On April 23, Cooper said the state could open in three phases after May 8, if coronavirus cases continue to trend downward: • In Phase 1, stay-at-home orders would remain, but some businesses would be allowed to open. • Phase 2 would lift stay-at-home orders, though vulnerable populations would be encouraged to stay home. Places of worship, bars and restaurants could operate with reduced capacities. • Phase 3 would ease restrictions for vulnerable populations, but also allow increased capacities at businesses and public gatherings.",
  },
  {
    name: "North Dakota",
    status: "Open with Restrictions",
    restrictions:
      "Many businesses were allowed to open on May 1. Qualifying businesses included bars and restaurants, recreational facilities, health clubs and athletic facilities, salons, and tattoo studios, but they must maintain social distancing of six feet, inform all employees and customers that they should avoid entering the facility if they have a cough or fever, provide contactless payment systems and hand sanitizer, and encourage wearing face masks. Movie theaters must limit admittance to 20% of normal operating capacity and keep at least two empty seats between guests. On May 11, Gov. Doug Burgum said summer school classes and certain summer programs will be able to take place in school buildings beginning June 1.",
  },
  {
    name: "Ohio",
    status: "Open with Restrictions",
    restrictions:
      "A statewide stay-at-home order will remain in place until May 29, the state health department said. Certain businesses, however, are expected to reopen in phases across May. Starting May 1, health procedures that don't require an overnight hospital stay can move forward, and dentist and veterinarian offices also may reopen, Gov. Mike DeWine said. From May 4, manufacturing, distribution and construction companies can reopen. General offices also may open, but businesses should have people work from home when possible, DeWine said. From May 12, consumer, retail and other services will be allowed to reopen, the governor said. The state has outlined protocols for reopening businesses, including requiring face coverings for all staff and customers, conducting daily health assessments, and maintaining good hygiene, cleaning and sanitizing.",
  },
  {
    name: "Oklahoma",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Kevin Stitt allowed some businesses to reopen beginning April 24. Among them are personal care businesses, restaurants, dining rooms, movie theaters, sporting venues and gyms if they maintain "strict social distancing and sanitation protocols." Bars, however, will still be closed. The plan involves three phases, and Stitt cautioned "we will not move to the next phase until the data tells us that it\'s safe to do so."',
  },
  {
    name: "Oregon",
    status: "Closed",
    restrictions:
      'Gov. Kate Brown issued an executive order directing Oregonians to stay at home that "remains in effect until ended by the governor." Hospitals, surgical centers, medical offices, and dental offices that meet requirements for Covid-19 safety and preparedness were allowed to resume non-urgent procedures on May 1. Brown announced a joint Western States Pact with California Gov. Gavin Newsom and Washington Gov. Jay Inslee on April 13. "This is not a light switch going on or off," Brown told CNN\'s Anderson Cooper on April 14. "This is going to be making a change, testing it, modeling it, seeing whether it works, and then if it does, you can make another change." Brown said she would not ease restrictions before seeing five components in place: declining growth rate of active cases, sufficient personal protective equipment, surge capacity in hospitals, increased test capacity, contact tracing and isolating positive cases, and strategies to protect vulnerable communities.',
  },
  {
    name: "Pennsylvania",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Tom Wolf wants to reopen the state in three phases beginning May 8. The phases will be broken down into three colors -- red, yellow and green -- and will follow the data, according to Wolf. He had issued stay-at-home orders across the state until April 30. For those in the red category, the order was extended on May 7 until June 4. For 24 counties in the yellow zone, a limited reopening of all businesses was allowed from May 8, “so long as they strictly adhere to the requirements of this guidance,” according to Wolf’s office. The guidance for businesses can be found here. ****On April 27, Wolf announced that golf courses, marinas, guided fishing trips and privately owned campgrounds could reopen statewide May 1, provided they follow social distancing guidelines. “Pennsylvanians have remained resilient throughout this Covid-19 crisis, and as we successfully continue to flatten the curve to protect our physical health, it is critical that we also focus on our physical and mental health during these extraordinary times. As the weather warms and daylight lengthens, enjoying time outdoors is an important way to manage stress,\" Wolf said. Pennsylvania Secretary of Health Dr Rachel Levine said May 6 that the state is allowing elective procedures to start in hospitals and health systems as well as ambulatory surgical facilities in most counties, but not the hardest hit. Pennsylvania had joined a coalition with the Northeastern states of New Jersey, New York, Connecticut, Delaware, Rhode Island and Massachusetts to coordinate the reopening of the economy, according to a press release from New York Gov. Andrew Cuomo's office.",
  },
  {
    name: "Rhode Island",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Gina Raimondo said May 7 that the statewide stay-at-home order would expire May 8, and the state would begin Phase 1 of its reopening. As of May 9, these places or services may restart if they comply with rules like cleaning frequently, reducing capacity, and screening employees: retail stores; elective medical procedures and other healthcare needs like immunizations and specialty care; state parks; and places of worship with five people or fewer. Employees of office-based businesses who need to go to the office may do so on a very limited basis, but work from home is encouraged. Strict restrictions remain in place for some businesses. Restaurants still are limited to delivery and takeout. Outdoor dining might be permitted eventually in Phase 1. Nursing homes and assisted living facilities remain closed to visitors. Entertainment venues like movie theaters, bowling alleys, museums, gyms, salons, and barber shops remain closed. Rhode Island had joined a coalition with the Northeastern states of New Jersey, New York, Connecticut, Delaware, Pennsylvania, and Massachusetts to coordinate the reopening of the economy, according to a press release from New York Gov. Andrew Cuomo's office.",
  },
  {
    name: "South Carolina",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Henry McMaster on May 11 said that close contact service providers, fitness and exercise centers, commercial gyms, and public or commercial pools will be able to open in a limited capacity on Monday, May 18. Restaurant dining rooms were opened, with restrictions, beginning May 11. Some retail stores have been open since April 20, including those selling furniture, books, music, flowers, clothing and accessories, as well as department stores, sporting goods stores and flea markets. Beaches were allowed to reopen to public access on April 21, though local governments are allowed to keep them closed. McMaster's state of emergency executive order has been extended to May 12.",
  },
  {
    name: "South Dakota",
    status: "Open",
    restrictions:
      'NONE. Gov. Kristi L. Noem did not issue a stay-at-home order. "We have seen such an outstanding call to action among the people of South Dakota that we actually have more people staying home than many of the other states that have put in shelter-in-place orders and have put together directives to tell people they can\'t leave their homes," she said at a town hall hosted by South Dakota Public Broadcasting on April 15. Noem announced on April 13 that South Dakota would be the first state to conduct a hydroxychloroquine trial to test against Covid-19.',
  },
  {
    name: "Tennessee",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Bill Lee issued a new executive order to replace his previous stay-at-home order. The new order will expire on May 30. "The order allows Tennesseans and businesses to return to work in all industries where that can be safely accomplished by following health guidelines, while urging employers to allow or require remote work/telework if possible," according to the press release. Restaurants, retail outlets, and gyms have been allowed to reopen in most counties in the state. Close contact services like salons and barbershops were allowed to reopen on May 6 in 89 of the state\'s 95 counties, Lee announced on April 29.',
  },
  {
    name: "Texas",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Greg Abbott had ordered all Texans to stay home through April 30. On May 5, he announced a reopening of certain businesses starting May 8. Salons were allowed to open May 8, with restrictions such as one customer per stylist and 6 feet between stations and customers waiting. Masks are strongly recommended by not mandatory. ****Gyms and exercise facilities, non-essential manufacturing and business offices will be allowed to reopen May 18, with restrictions such as keeping capacity at 25% and ensuring social distancing. All retail stores, restaurants, movie theaters, malls, museums, and libraries were permitted to reopen on Friday, May 1, but must limit their capacity to 25% of their listed occupancy.",
  },
  {
    name: "Utah",
    status: "Open with Restrictions",
    restrictions:
      'Gov. Gary Herbert issued an executive order that places Utah under "moderate risk" protocols for Covid-19 beginning May 1 and will remain in effect until May 16. Utah has not issued a stay-at-home mandate. "We aren\'t returning to business as usual yet," Herbert said. "In fact, we will not return to \'normal\' for a significant period of time. But Utahns\' diligence over the past month has given us time to build our healthcare capacity and PPE stores. We can now cautiously relax some requirements, and allow businesses that were closed to operate with safety measures in place." The state allowed restaurants to let customers dine in again "with extreme precaution" starting May 1. Although in-person dining will be allowed as long as social distancing is maintained and the health of employees is monitored, the state still says takeout and delivery are preferable. Similarly, the state allowed gyms to reopen, but says it is recommended that they remain closed. Personal services businesses like hair salons can reopen with social distancing, according to the state\'s moderate risk guidelines.',
  },
  {
    name: "Vermont",
    status: "Open with Restrictions",
    restrictions:
      'Though a "Stay Home, Stay Safe" order is in effect until May 15, certain restrictions have been relaxed. Starting May 6, gatherings of 10 or less people are allowed. Gov. Phil Scott recommended, but did not require, that these gatherings happen outdoors. Adults ages 65 and older are asked to continue to stay home due to the risk of severe illness, the governor said. Outdoor recreational locations such as skate parks, tennis courts, ball fields, trail networks, and golf courses were allowed to May 6. Starting May 4, Vermont allowed manufacturing, construction and distribution businesses to operate, with certain safety requirements. Also on May 4, some elective surgeries and procedures could start again. Ones that require a hospital stay are not. Scott said he hopes to allow child care services to restart on June 1.',
  },
  {
    name: "Virginia",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Ralph Northam issued a stay-at-home order effective until June 10. A separate executive order that restricted certain businesses and crowds of more than 10 people will expire May 14. The order has closed recreation, entertainment, and personal care businesses, and limits restaurants to offering takeout and delivery services only. Elective surgery and dental procedures in Virginia were allowed to resume May 1.",
  },
  {
    name: "Washington",
    status: "Open with Restrictions",
    restrictions:
      "Gov. Jay Inslee extended Washington's stay-at-home order until May 31. Most state parks and recreational areas reopened May 5. The state also will allow to people to play golf again, but it will be limited to only two people playing together at a time, except when the players live in the same home. No overnight camping will be allowed on any public land. On May 4, Inslee said individual counties can ask for an exception to state coronavirus regulations on businesses. In order to apply, a county must have fewer than 75,000 people, with no new Covid-19 cases for three consecutive weeks. Throughout the state, non-essential businesses will still be prohibited from having customers in their stores, but some non-contact businesses like lawn care and car washes can resume from May 5. Inslee announced a joint Western States Pact with California Gov. Gavin Newsom and Oregon Gov. Kate Brown on April 13.",
  },
  {
    name: "West Virginia",
    status: "Open with Restrictions",
    restrictions:
      "The stay-at-home order for West Virginia was lifted at 12:01 a.m. May 4 and replaced with another order, Gov. Jim Justice said. The new order still encourages people to stay at home but doesn't require it, Justice said. Further guidance would be issued for areas considered hot spots. Justice said in a press conference Tuesday, April 28, that his administration planned to reopen local businesses Thursday. Qualifying businesses included pharmacies, chiropractors, dentists, psychologists, physical therapists, social workers and others. All businesses reopening will require personnel to sanitize, physically distance and wear face coverings.",
  },
  {
    name: "Wisconsin",
    status: "Open with Restrictions",
    restrictions:
      "The Wisconsin Supreme Court overturned the state's stay-at-home order, ruling it unlawful and unenforceable in a high-profile win for the state's Republican-led Legislature. In a 4-3 decision May 13, the court ruled that Democratic Gov. Tony Evers' administration overstepped its authority when the state Department of Health Services extended the order to May 26. Wisconsin reopened 34 state parks and forests under special conditions to help minimize overcrowding and allow for social distancing requirements on May 1. Standalone and strip mall retail stores can reopen with limited capacities, Evers said May 11.",
  },
  {
    name: "Wyoming",
    status: "Open with Restrictions",
    restrictions:
      'Bars and restaurants will be allowed to reopen on Friday, May 15 under a new order signed by Gov. Mark Gordon. "We are trying to work our way safely to as normal conditions as we can get," Gov. Gordon said May 13. Tables will be limited to six people, but unlike most states with similar regulations, people from different households will be allowed to sit at the same table. Buffet service is not allowed, and tables must be separated by at least 6 feet. All restaurant employees must be screened for Covid-19 symptoms before beginning work. Movie theaters and salon are being allowed to open with social distancing, and public gatherings of up to 25 people will be allowed. "The size change for gatherings is significant but does not allow for large events," said state Epidemiologist Dr. Alexia Harrist. The health orders are set to expire on May 31. Some counties have been given permission to loosen regulations even more.',
  },
];

const renderState = (state, index) => {
  return (
    <tr key={index}>
      <td>{state.name}</td>
      <td>{state.status}</td>
      <td>{state.restrictions}</td>
    </tr>
  );
};

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */
  async function mapEffect({ leafletElement: map } = {}) {
    let response;

    try {
      response = await axios.get(
        "https://covidtracking.com/api/v1/states/current.json"
      );
    } catch (e) {
      console.log(`Failed to fetch states: ${e.message}`, e);
      return;
    }

    const { data = [] } = response;
    const hasData = Array.isArray(data) && data.length > 0;
    if (!hasData) {
      return;
    }
    console.log(data);

    const geoJson = {
      type: "FeatureCollection",
      features: current.map((state = {}) => {
        const { latitude: lat, longitude: lng } = state;
        return {
          type: "Feature",
          properties: {
            ...state,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }),
    };

    console.log(geoJson);

    const geoJsonLayers = new L.GeoJSON(JSON.parse(JSON.stringify(geoJson)), {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const {
          grade,
          state,
          positive,
          negative,
          death,
          recovered,
          hospitalizedCurrently,
          totalTestResults,
          onVentilatorCurrently,
        } = properties;

        casesString = `${positive}`;
        if (positive > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${state}</h2>
              <ul>
                <li><strong>Grade:</strong> ${grade}</li>
                <li><strong>Positive:</strong> ${positive}</li>
                <li><strong>Negative:</strong> ${negative}</li>
                <li><strong>Death:</strong> ${death}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Hospitalized Currently:</strong> ${hospitalizedCurrently}</li>
                <li><strong>Total Test Results:</strong> ${totalTestResults}</li>
                <li><strong>Currently on Ventilator:</strong> ${onVentilatorCurrently}</li>
              </ul>
            </span>
            ${casesString}
          </span>
        `;

        return L.marker(latlng, {
          icon: L.divIcon({
            className: "icon",
            html,
          }),
          riseOnHover: true,
        });
      },
    });
    geoJsonLayers.addTo(map);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}></Map>

      <Container type="content" className="text-center home-start">
        <div class="dropdown">
          <a
            class="btn btn-secondary dropdown-toggle"
            href="#statePicked"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Pick your State
          </a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">
              Alabama
            </a>
            <a class="dropdown-item" href="#">
              Alaska
            </a>
            <a class="dropdown-item" href="#">
              Arizona
            </a>
          </div>
        </div>

        <ReactBootStrap.Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>State Name</th>
              <th>Status</th>
              <th>Restrictions</th>
            </tr>
          </thead>
          <tbody id="statePicked">{unitedStates.map(renderState)}</tbody>
        </ReactBootStrap.Table>
      </Container>
    </Layout>
  );
};

export default IndexPage;
