import React from "react";
import { Container, Row, Col } from "reactstrap";
import qs from "query-string";

const Basketball = [
  {
    id: 1,
    title: "1",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Basketball_+5+Basic+Moves/1.mp4"
  },
  {
    id: 2,
    title: "2",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Basketball_+5+Basic+Moves/2.mp4"
  },
  {
    id: 3,
    title: "3",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Basketball_+5+Basic+Moves/3.mp4"
  },
  {
    id: 4,
    title: "4",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Basketball_+5+Basic+Moves/4.mp4"
  },
  {
    id: 5,
    title: "5",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Basketball_+5+Basic+Moves/5.mp4"
  },
  {
    id: 6,
    title: "6",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Basketball_+5+Basic+Moves/6.mp4"
  }
];

const MartialArts = [
  {
    id: 1,
    title: "1",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/Arm-drag-back-take-to-back-trip.mp4"
  },
  {
    id: 2,
    title: "2",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/Double+Leg+Takedown.mp4"
  },
  {
    id: 3,
    title: "3",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/Arm-drag-back-take-to-back-trip.mp4"
  },
  {
    id: 4,
    title: "4",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/Double+Leg+Takedown.mp4"
  },
  {
    id: 5,
    title: "5",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/Single+Leg+Takedown.mp4"
  },
  {
    id: 6,
    title: "6",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/The+Snapdown.mp4"
  },
  {
    id: 7,
    title: "7",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/Tuck-under-back-take-to-back-trip.mp4"
  },
  {
    id: 8,
    title: "8",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/Uchi+Mata.mp4"
  },
  {
    id: 9,
    title: "9",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Martial+Arts_+MMA+Takedowns-20200306T084843Z-001/Uki+Goshi.mp4"
  }
];

const Choreography = [
  {
    id: 1,
    title: "1",
    video:
      "https://r3---sn-cvh76ned.c.drive.google.com/videoplayback?expire=1583600875&ei=q5xjXuXeHtyQrvIPuaGAwAw&ip=111.118.248.118&cp=QVNNVUdfT1hVRlhOOm9lXzlsWDlqY045THpCVXd3NnJrQUVsOWFjV1pOa2dGOW9lV09EZG93V3M&id=80117d862da7ec9f&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76ned&ms=nxu&mv=u&mvi=2&pl=24&ttl=transient&susc=dr&driveid=1ezoDicJexPbDxn_MFVrTRxZy6BnFJGez&app=explorer&mime=video/mp4&dur=10.936&lmt=1579596852973510&mt=1583586110&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRgIhAO9Pkpif8ajc79i1Am86Smq8jTMBYx3l7zbE82tMgzcnAiEA6Msb3OB4a29Bxq7z0nnXhTSaiMfT4zV4w6NlkHDiGmg=&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRgIhAMpJacf93YW3_reCiP84gnVGJht1iBTdaCpWbn4C36SVAiEAo-TYoDgejFde2VEd4S53hvJYYJP2I_UsJ7U6fkD3lqY=&cpn=1xknnTEMpBFTlLB7&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 2,
    title: "2",
    video:
      "https://r4---sn-cvh76nes.c.drive.google.com/videoplayback?expire=1583600873&ei=qZxjXoucGLvJrvIPtNu48Ak&ip=111.118.248.118&cp=QVNNVUdfT1hVRFhOOm9lXzlsWDdqY045THpCVXd1NnJrQUVsOWFjVVpOa2dGOW9lV01EZG93V3M&id=eb02626dd48d56cf&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76nes&ms=nxu&mv=u&mvi=3&pl=24&ttl=transient&susc=dr&driveid=1HJc31elWX2cB8aj-ZElihkVUZ8HIIe1-&app=explorer&mime=video/mp4&dur=8.707&lmt=1579596896405292&mt=1583586110&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRQIhAJdOQ_xvpfKn1iesfTA3m4oSsXrQUbp6PV0cjSY2Zb9SAiBR35fDb549b6dGl2YOBl439KaRyVRqLwgBXAiWmWmSkw==&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRQIgLwwv03WrXYvubTC35WKks9vw-SBI8y5i8TSfU2jyGYsCIQC5BwQE5DJJ2Pm2Gi0yaD5CS_fRgeGRSQjQVNG0p_ikEg==&cpn=mPgsnr9ALmpwdmzv&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 3,
    title: "3",
    video:
      "https://r2---sn-cvh76n7d.c.drive.google.com/videoplayback?expire=1583602561&ei=QaNjXtStFJzGrvIP96G0yAE&ip=111.118.248.118&cp=QVNNVUdfUVVUQlhOOm9lXzFpVzVqY045THpEUnZzNnJrQUVsMXhiU1pOa2dGOXFiVktEZG93V3M&id=c1546a1b47790fe5&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76n7d&ms=nxu&mv=u&mvi=1&pl=24&ttl=transient&susc=dr&driveid=1Ws5cb_NXERw-ZwxYHGxsYUMEwzCqXcoJ&app=explorer&mime=video/mp4&dur=5.061&lmt=1579596920966787&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRQIgaNlCy1GPmmbQX4UKtcWbYffM70ZaHrBPZgfWVS9KffACIQD5zuH0t0DsWopQSaNmdn62kzujk5fDtbskz3hizZrJQw==&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRQIhAJLu3UwrghhWdHq2gr0WFuMTmpxyWBfBEDM18rXTK27_AiBVdmQ5Yk7BKw0NmCirgHbn2HvQmvPT1mE41icbuwqHIw==&cpn=ftux6wMs14hhjOKt&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 4,
    title: "4",
    video:
      "https://r3---sn-cvh76nek.c.drive.google.com/videoplayback?expire=1583602578&ei=UqNjXvngNbLJrvIPjsmZiAM&ip=111.118.248.118&cp=QVNNVUdfUVVVSVhOOm9lXzFpWDJqY045THpEUnd6NnJrQUVsMXhjWlpOa2dGOXFiV1JEZG93V3M&id=0e97260ba480a195&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76nek&ms=nxu&mv=u&mvi=2&pl=24&ttl=transient&susc=dr&driveid=1qBzT2RROAqwg1NEsJHRNxwrLORArG5kt&app=explorer&mime=video/mp4&dur=4.852&lmt=1579596911769470&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRAIgHBZo7Kz7FZOjBDAd4pZ6k5bDruPeb_S5iGegazx2Uo0CIGxfjwZ4GEhU1KkNWa86Y9nZuEFAnnZrNedKHec9yw7X&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRAIgB2yas7UsUrIS1xHoT6SKoYUI6CgzGcxzQG51D6fkeRcCICPYMLFwVwbAPDgOQlSKYdTaZSdg43iUegtI_lqVF_ZT&cpn=jJ20l32GUu5l0BAO&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 5,
    title: "5",
    video:
      "https://r3---sn-cvh76nes.c.drive.google.com/videoplayback?expire=1583602603&ei=a6NjXteoHLTBrvIPydS_-AI&ip=111.118.248.118&cp=QVNNVUdfUVZORFhOOm9lXzFqUTdqY045THpEU3B1NnJrQUVsMXl2VVpOa2dGOXFjUE1EZG93V3M&id=87075952376e2cda&itag=59&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76nes&ms=nxu&mv=u&mvi=2&pl=24&ttl=transient&susc=dr&driveid=1LaNLW1ZY309jiLo9auHb4BGYgMcxDQxY&app=explorer&mime=video/mp4&dur=15.069&lmt=1579596944495269&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRQIhAN6PvOxLL3VTKGtVLYQTJT_4CeOJtnjPh1e7_ZL7vpSyAiB8o9i0x8Ohvu4gXUP_NVahHEzS0Q666YyoR2feOz7v4A==&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRgIhAIPMuGqhu_Zm8WU9g_H7JDASz-iS0eI8Qpw56dhyYEdfAiEAiNoyVV6ZiZNYvl4HCnvi955hihsNT45astNpcKGfrss=&cpn=HRddMXvQenvi8J4K&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 6,
    title: "6",
    video:
      "https://r1---sn-cvh76nez.c.drive.google.com/videoplayback?expire=1583602618&ei=eqNjXtuMJ9yQrvIPuaGAwAw&ip=111.118.248.118&cp=QVNNVUdfUVZPSVhOOm9lXzFqUjJqY045THpEU3F6NnJrQUVsMXl3WlpOa2dGOXFjUVJEZG93V3M&id=36856514e9de8509&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76nez&ms=nxu&mv=u&mvi=0&pl=24&ttl=transient&susc=dr&driveid=13-oqy51CM6pCXQIzIYnlnLmlPoWSw5ZN&app=explorer&mime=video/mp4&dur=10.959&lmt=1579596930944791&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRgIhAOUmkm0nwpq4fZ7Y9HPokKNascWRI0gpyArSGHqaxzH9AiEAr09MpfseSrHW-EME2Wqb6PHGc4tYqzztdlYEaqgSmfg=&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRgIhAKJy1Sx2dje5O9l1vbg7W0iUa5Xx7u2Avpji0gcdzMHxAiEA-oBWtBu9z8LGWeboEvzBdL7RPRStbUVPvXmEiZkMPCA=&cpn=lVh5-sATg3V3ukou&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 7,
    title: "7",
    video:
      "https://r2---sn-cvh7knez.c.drive.google.com/videoplayback?expire=1583602643&ei=k6NjXr-xB_OkrvIP0fe2YA&ip=111.118.248.118&cp=QVNNVUdfUVZSRFhOOm9lXzFqVTdqY045THpEU3R1NnJrQUVsMXl6VVpOa2dGOXFjVE1EZG93V3M&id=8493df398ed1937b&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh7knez&ms=nxu&mv=u&mvi=1&pl=24&ttl=transient&susc=dr&driveid=13vJq_ftnwrKWzhwGgFgxPearfVgP0Yyi&app=explorer&mime=video/mp4&dur=14.930&lmt=1579597198126936&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRQIhAPN9UJP5Ur_WYT5IbSCXIgn6rE94v4uzhgH3PcnVSuvqAiBOUP44cFLLUhcn6gi0utCH23NJVut_n3Vqw9c0QO3TXg==&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRgIhAPKgL_svPIJ3tqXCBSmj09F4C8BEOIRLE1Ap-43P1adOAiEAiNg9renCm7cS_6rMGC3wKJoHqWgs02i9f-0LLef6nZ8=&cpn=819UbbJdDSZyGWVX&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 8,
    title: "8",
    video:
      "https://r1---sn-cvh76nez.c.drive.google.com/videoplayback?expire=1583602663&ei=p6NjXtHwCqKkrvIPqNCqmAg&ip=111.118.248.118&cp=QVNNVUdfUVZURFhOOm9lXzFqVzdqY045THpEU3Z1NnJrQUVsMXliVVpOa2dGOXFjVk1EZG93V3M&id=82a1b12a9395cbd5&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76nez&ms=nxu&mv=u&mvi=0&pl=24&ttl=transient&susc=dr&driveid=1GNqJQ5H-V-63C1o6kFShYeHqH83C9g2T&app=explorer&mime=video/mp4&dur=10.936&lmt=1579596932027085&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRQIgREIVoCYLiJ63XEGy_-GGwbhC3qrOc0hfVG7tqfLDpmECIQD8Iy3eVmwalPCsjMKMcRDaFj_6hGg4-tHWhQ67hlsb-g==&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRgIhAPif_RHhg210DJXTG8PpPKjT8IwBmPHNUNVk2fzQLLg8AiEAvc2dygZPKZ37-X9oruE3_YNqY2SJzv7BBD-rdhu9zUs=&cpn=jd_mwt6IxRn-gr6Q&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 9,
    title: "9",
    video:
      "https://r1---sn-cvh76nes.c.drive.google.com/videoplayback?expire=1583602688&ei=wKNjXtSzK-_hrvIP8audyAI&ip=111.118.248.118&cp=QVNNVUdfUVZWSVhOOm9lXzFqWTJqY045THpEU3h6NnJrQUVsMXlkWlpOa2dGOXFjWFJEZG93V3M&id=4d6e9ac7042bfbd8&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76nes&ms=nxu&mv=u&mvi=0&pl=24&ttl=transient&susc=dr&driveid=1EYksJe-iy9cbkbOKSbbKX28Lce5hCZAg&app=explorer&mime=video/mp4&dur=7.964&lmt=1579596933473705&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRQIhAKufLp7LDNkUUKz8-jmha_FdwCZohyc7PMMk0hvG4cNCAiAIJIZt-fwXQeIkP_85eKGXSkfin0oTD6uyHQoeEWgdZA==&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRgIhANcyt5CS4FEyy9hz-BvTY4GcF93fmTpGpZBhmvahboPOAiEAmJgaugQDYuzz9mYZvuFJ8IrF5fmMU-1AB6Tl7_n81gY=&cpn=4LPfk-cPkGSyNTpi&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 9,
    title: "9",
    video:
      "https://r2---sn-cvh76n7k.c.drive.google.com/videoplayback?expire=1583602706&ei=0qNjXoPgGuGRrvIPk_iPmAc&ip=111.118.248.118&cp=QVNNVUdfUVdOR1hOOm9lXzFrUTBqY045THpEVHB4NnJrQUVsMXp2WFpOa2dGOXFkUFBEZG93V3M&id=1b6705b08008d7ab&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76n7k&ms=nxu&mv=u&mvi=1&pl=24&ttl=transient&susc=dr&driveid=17KadLjZNCkiOQRDitcKbojK0jfei9eAX&app=explorer&mime=video/mp4&dur=10.123&lmt=1579596849212467&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRQIgF-554JBp06FImohhlXCbrn22rW9VmSTaQIxBo9Dppm4CIQCILFqzqMcQQ9axb_Ff26BbL6cIiPNieXJ2TkhOjg9Ogg==&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRgIhAPCB-HwtErrC8sAR7JHj5Yev3y-hr4_BmM0125-iw-nkAiEA2C6ykM8hwXLlegrLhCQoGNLIiqpJziP79ZLfMohEPxk=&cpn=mpoYo7-sBTe4wrM2&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 9,
    title: "9",
    video:
      "https://r4---sn-cvh76nes.c.drive.google.com/videoplayback?expire=1583602737&ei=8aNjXv3-J9yQrvIPuaGAwAw&ip=111.118.248.118&cp=QVNNVUdfUVdRSFhOOm9lXzFrVDFqY045THpEVHN5NnJrQUVsMXp5WVpOa2dGOXFkU1FEZG93V3M&id=935cd9e56e117a03&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76nes&ms=nxu&mv=u&mvi=3&pl=24&ttl=transient&susc=dr&driveid=1vZOO4WwRtcjprOJPkAhXXtyGY0TyJgTk&app=explorer&mime=video/mp4&dur=4.922&lmt=1579596848523927&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRQIhAIRTRjCx483tfaeQ6JaPe0VhYvYBG3DcxQPoP0-EbcbjAiATMmCOJnBv7q1vuo7XR75OEuq4ywr7BfGXAJ-fvyVi_g==&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRQIgUx2vM5wYg6EXYkjs8vmy9SmgWQBCD96iaIppICtcWvMCIQC1gR6-Ntl3Iv2zCbd8INKeFSIgN3DLbuPFHEHBQyMx_A==&cpn=-jDLNJ-N0YesKgOr&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
  {
    id: 9,
    title: "9",
    video:
      "https://r4---sn-cvh76n7k.c.drive.google.com/videoplayback?expire=1583602761&ei=CaRjXprmK7TBrvIPydS_-AI&ip=111.118.248.118&cp=QVNNVUdfUVdUQlhOOm9lXzFrVzVqY045THpEVHZzNnJrQUVsMXpiU1pOa2dGOXFkVktEZG93V3M&id=d6aca385c4a654b5&itag=18&source=webdrive&requiressl=yes&mm=30&mn=sn-cvh76n7k&ms=nxu&mv=u&mvi=3&pl=24&ttl=transient&susc=dr&driveid=1x4M4Uh0TubfuJBnWBwLxPtuw48TAs-qt&app=explorer&mime=video/mp4&dur=6.989&lmt=1579596851626675&mt=1583587847&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,dur,lmt&sig=ADKhkGMwRAIgM6yNFhl6E9BPfFa56nt4UgrOSs9e0o5xZJ8EFZLDivcCIDWYqrIgRtIwh28U9tYjnPepAIJZW_e2tGnW3rtwoPMO&lsparams=mm,mn,ms,mv,mvi,pl&lsig=ABSNjpQwRQIhAPPKuPAYDM50Nk4l_kW7MnDPTM50HJ19tJvrBIyyhi_MAiB7W1f2MUbocrGoDtNHKuNALbe6QVEAnYK-v8u1RoEd1A==&cpn=059CTMDAM3T9GA4N&c=WEB_EMBEDDED_PLAYER&cver=20200304"
  },
];

const Guitar = [
  {
    id: 1,
    title: "1",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Guitar_+Hallelujah+Tutorial+(Easy+Version)/1.mp4"
  },
  {
    id: 2,
    title: "2",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Guitar_+Hallelujah+Tutorial+(Easy+Version)/2.mp4"
  },
  {
    id: 3,
    title: "3",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Guitar_+Hallelujah+Tutorial+(Easy+Version)/3.mp4"
  },
  {
    id: 4,
    title: "4",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Guitar_+Hallelujah+Tutorial+(Easy+Version)/4.mp4"
  },
  {
    id: 5,
    title: "5",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Guitar_+Hallelujah+Tutorial+(Easy+Version)/5.mp4"
  },
  {
    id: 6,
    title: "6",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Guitar_+Hallelujah+Tutorial+(Easy+Version)/6.mp4"
  },
  {
    id: 7,
    title: "7",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Guitar_+Hallelujah+Tutorial+(Easy+Version)/7.mp4"
  }
];

const Painting = [
  {
    id: 1,
    title: "1",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Painting_+Styling+Hacks/1.mp4"
  },
  {
    id: 2,
    title: "2",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Painting_+Styling+Hacks/2.mp4"
  },
  {
    id: 3,
    title: "3",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Painting_+Styling+Hacks/3.mp4"
  },
  {
    id: 4,
    title: "4",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Painting_+Styling+Hacks/5.mp4"
  },
  {
    id: 5,
    title: "5",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Painting_+Styling+Hacks/6.mp4"
  },
  {
    id: 6,
    title: "6",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Painting_+Styling+Hacks/7.mp4"
  }
];

const Soccer = [
  {
    id: 1,
    title: "1",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Berbatov+Spin.mp4"
  },
  {
    id: 2,
    title: "2",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Elastico.mp4"
  },
  {
    id: 3,
    title: "3",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Feints.mp4"
  },
  {
    id: 4,
    title: "4",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Basketball_+5+Basic+Moves/4.mp4"
  },
  {
    id: 5,
    title: "5",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Inside+Step-Over.mp4"
  },
  {
    id: 6,
    title: "6",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Maradona+Spin+(Roulette).mp4"
  },
  {
    id: 7,
    title: "7",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Outside+Heel+Toe.mp4"
  },
  {
    id: 8,
    title: "8",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Pull+Behind+Leg.mp4"
  },
  {
    id: 9,
    title: "9",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Roll+to+Heel.mp4"
  },
  {
    id: 10,
    title: "10",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Ronaldo+Chop.mp4"
  },
  {
    id: 11,
    title: "11",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Scoop+Turn.mp4"
  },
  {
    id: 12,
    title: "12",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Speed+Elastic.mp4"
  },
  {
    id: 13,
    title: "13",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/Stop+_+Go.mp4"
  },
  {
    id: 14,
    title: "14",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/The+V.mp4"
  },
  {
    id: 15,
    title: "15",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/final_5e04964b8c70da0014fa2244_168616.mp4"
  },
  {
    id: 16,
    title: "16",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/final_5e0496cb3354d900140a9eff_229107.mp4"
  },
  {
    id: 17,
    title: "17",
    video:
      "https://deepplay-video.s3.ca-central-1.amazonaws.com/Sample+Videos/Soccer_+Moves+to+Trick+Opponents/final_5e049cdbe372f5001437ee99_968786.mp4"
  }
];

class SampleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleSet: Basketball,
      showVideoIndex: -1,
      videoIndex: -1,
    };
  }

  componentDidMount = () => {
    let parsed = qs.parse(this.props.location.search);
    if (parsed.title === 'Basketball_ 5 Basic Moves') {
    
      this.setState({
        sampleSet: Basketball
      })
    } else if (parsed.title === 'Martial Arts_ MMA Takedowns') {
      this.setState({
        sampleSet: MartialArts
      })
    } else if (parsed.title === 'Choreography_ Boogaloo Tutorial') {
    
      this.setState({
        sampleSet: Choreography
      })
    } else if (parsed.title === 'Guitar_ Hallelujah Tutorial (Easy Version)') {
    
      this.setState({
        sampleSet: Guitar
      })
    } else if (parsed.title === 'Painting_ Styling Hacks') {
      this.setState({
        sampleSet: Painting
      })
    } else if (parsed.title === 'Soccer_ Moves to Trick Opponents') {
      this.setState({
        sampleSet: Soccer
      })
    }
  }
  videoPlayHandler = (indexNumber) => {
    const videoPlay = document.getElementById("webm-video-"+indexNumber);
      videoPlay.play();
      videoPlay.volume = 0.2;
  };
  videoPlayPause = (indexNumber) => {
    const videoPlay = document.getElementById("webm-video-"+indexNumber);
      videoPlay.pause();
  };
  render() {
    return (
      <Container>
        <section className="play-list-collection set-detail-section">
          <Row>
            <Col md="12 p-3">
              <div className="content-header">
                <span className="content-title">
                  <div className="h4 theme-heading main-title">
                    Dance Cheoreography for Uptown Funk
                  </div>
                  <div className="sub-title">5 moves</div>
                </span>
              </div>
            </Col>

            {
              this.state.sampleSet && this.state.sampleSet.length ?
                this.state.sampleSet.map((video, index) => (
                  <Col
                    md="4"
                    key={index}
                  // onClick={() => this.handleShowVideo(index)}
                  // onMouseLeave={() => {
                  //   this.handleVideoHoverLeave();
                  // }}
                  >
                    <div
                      className="play-list-block "
                    // onMouseOver={() => this.handleVideoHover(index)}
                    // onMouseLeave={() => {
                    //   this.handleVideoPause(index);
                    // }}
                    >
                      <div
                        className="play-sub-block "
                      // onMouseLeave={() => this.handleVideoPause(index)}
                      >
                        <div
                          className="play-list-img blur-img-wrap checked-wrap"
                        // onMouseOver={() => this.handleVideoPlay(index)}
                        >
                          <video
                            width={"100%"}
                            id={`webm-video-${index}`}
                            muted={true}
                            
                            onMouseEnter={()=>{this.videoPlayHandler(index)}}
                            onMouseLeave={()=>{this.videoPlayPause(index)}}
                          >
                            <source src={video.video} type="video/mp4" />
                          </video>
                        </div>
                        <div className="play-list-text">
                          <div className="play-list-heading h6 ">
                            {video.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )) : null}
          </Row>
        </section>
      </Container>
    );
  }
}
export default SampleSet;
