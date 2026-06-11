const express = require("express");
const multer = require("multer");
const AdmZip = require("adm-zip");
const path = require("path");
const fs = require("fs");

const auth =require("../middleware/authMiddleware");
const Site = require("../models/Site");

const router = express.Router();

/*
--------------------------------
MULTER CONFIGURATION
--------------------------------
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null,Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage,});

/*
--------------------------------
POST /api/deploy
--------------------------------
*/

router.post("/", auth,upload.single("project"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const zipPath = req.file.path;

      // Remove .zip extension
      const projectName =path.parse(req.file.originalname).name;

      const targetFolder = path.join( process.cwd(),"websites",projectName);

      /*
      --------------------------------
      CREATE PROJECT FOLDER
      --------------------------------
      */

      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, {
          recursive: true,
        });
      }

      /*
      --------------------------------
      EXTRACT ZIP
      --------------------------------
      */

      const zip = new AdmZip(zipPath);

      zip.extractAllTo(targetFolder,true);

      /*
      --------------------------------
      DEPLOYMENT URL
      --------------------------------
      */

      const extractedItems =fs.readdirSync(targetFolder);

      if(extractedItems.length === 1){
      
         const firstFolder =
         path.join(
            targetFolder,
            extractedItems[0]
         );
       
         if(
            fs.statSync(firstFolder)
            .isDirectory()
         ){
           const deployedUrl = `${req.protocol}://${req.get("host")}/sites/${projectName}`;
         }
      }

      const deployedUrl = `${req.protocol}://${req.get("host")}/sites/${projectName}/${projectName}`;


      const site = await Site.create({
        projectName,
        deployedUrl,
        folderPath: targetFolder,
        userId:req.user.id,
});

      return res.status(200).json({
        success: true,
        message:
          "Project deployed successfully",

        projectName,
        deployedUrl,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Deployment failed",
      });
    }
  }
);

/*
====================
GET ALL SITES
====================
*/

router.get("/",auth,async (req, res) => {
    try {
      const sites =await Site.find({ userId: req.user.id }).sort({createdAt: -1,});

      res.json(sites);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

/*
====================
DELETE SITE
====================
*/

router.delete("/:id",auth,async (req, res) => {
    try {
      const site =await Site.findOne({ _id:req.params.id, 
        userId:req.user.id });

      if (!site) {
        return res
          .status(404)
          .json({
            message:
              "Site not found",
          });
      }

      if (fs.existsSync(site.folderPath)) {
        fs.rmSync( site.folderPath,
          {
            recursive: true,
            force: true,
          }
        );
      }

      await Site.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message:
          "Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;