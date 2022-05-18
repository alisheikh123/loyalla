import profile from '../styles/images/profile.png'
export default function() {
  return [
    {
      title: "Home",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Profile",
      htmlBefore: '<i class="material-icons">portrait</i>',
      to: "/team",
    },
    {
      title: "Schedule",
      htmlBefore: '<i class="material-icons">event_available</i>',
      to: "/shops",
    },
    {
      title: "Setting",
      htmlBefore: '<i class="material-icons">settings</i>',
      to: "/products",
    },
    // {
    //   title: "Target",
    //   htmlBefore: '<i class="material-icons">adjust</i>',
    //   to: "/link4",
    // },
    // {
    //   title: "Tracking",
    //   htmlBefore: '<i class="material-icons">my_location</i>',
    //   to: "/link5",
    // },
    
  ];
}
